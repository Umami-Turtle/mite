import { create } from "zustand";
import { produce } from "immer";
import {
  Extension,
  ExtensionFeature,
  extensionFeatures,
  extensionFeatureSchema,
  ExtensionMetadata,
} from "./schemas";

interface ExtensionsState {
  extensions: Record<
    string,
    {
      enabledFeatures: ExtensionFeature[];
      extension: Extension;
    }
  >;
  addExtension: (metadata: ExtensionMetadata, extension: Extension) => void;
  removeExtension: (metadata: ExtensionMetadata) => void;
  turnOnFeature: (extensionId: string, feature: ExtensionFeature) => void;
  turnOffFeature: (extensionId: string, feature: ExtensionFeature) => void;
}

export const useExtensions = create<ExtensionsState>((set) => ({
  extensions: {},
  addExtension: (metadata, extension) => {
    set((state) =>
      produce(state, (draft) => {
        draft.extensions[metadata.id] = {
          enabledFeatures: [],
          extension,
        };
        for (const feature of extensionFeatures) {
          if (extension[feature]) {
            draft.extensions[metadata.id].enabledFeatures.push(feature);
          }
        }
      }),
    );
  },
  removeExtension: (metadata: ExtensionMetadata) => {
    set((state) =>
      produce(state, (draft) => {
        delete draft.extensions[metadata.id];
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
