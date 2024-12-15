import { extensionSchema } from "./schemas";

export const loadRemoteExtension = async (extensionBundledJSURL: string) => {
  const rawExtensionModule = await import(extensionBundledJSURL);
  const rawExtension = rawExtensionModule.default;
  const response = extensionSchema.safeParse(rawExtension);
  if (!response.success) {
    return;
  }
  const extension = response.data;
  return extension;
};

const EXTENSION_LIST_URL =
  "https://github.com/Umami-Turtle/mite/raw/main/extensions/index.json";

export const fetchRemoteExtensionList = async () => {
  const response = await fetch(EXTENSION_LIST_URL);
  const data = await response.json();
  return data.extensions;
};
