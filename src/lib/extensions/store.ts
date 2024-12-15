import { create } from "zustand";
import { produce } from "immer";
import {
  Extension,
  ExtensionFeature,
  extensionFeatures,
  extensionFeatureSchema,
} from "./schemas";

interface ExtensionsState {
  extensions: Record<
    string,
    {
      enabledFeatures: ExtensionFeature[];
      extension: Extension;
    }
  >;
  addExtension: (extension: Extension) => void;
  removeExtension: (extension: Extension) => void;
  turnOnFeature: (extensionId: string, feature: ExtensionFeature) => void;
  turnOffFeature: (extensionId: string, feature: ExtensionFeature) => void;
}

export const useExtensions = create<ExtensionsState>((set) => ({
  extensions: {},
  addExtension: (extension) => {
    set((state) =>
      produce(state, (draft) => {
        draft.extensions[extension.metadata.id] = {
          enabledFeatures: [],
          extension,
        };
        for (const feature of extensionFeatures) {
          if (extension[feature]) {
            draft.extensions[extension.metadata.id].enabledFeatures.push(
              feature,
            );
          }
        }
      }),
    );
  },
  removeExtension: (extension) => {
    set((state) =>
      produce(state, (draft) => {
        delete draft.extensions[extension.metadata.id];
      }),
    );
  },
  turnOnFeature: (extensionId, feature) => {
    const { success } = extensionFeatureSchema.safeParse(feature);
    if (!success) {
      return;
    }
    set((state) =>
      produce(state, (draft) => {
        draft.extensions[extensionId].enabledFeatures.push(feature);
      }),
    );
  },
  turnOffFeature: (extensionId, feature) => {
    const { success } = extensionFeatureSchema.safeParse(feature);
    if (!success) {
      return;
    }
    set((state) =>
      produce(state, (draft) => {
        draft.extensions[extensionId].enabledFeatures = draft.extensions[
          extensionId
        ].enabledFeatures.filter((f) => f !== feature);
      }),
    );
  },
}));
