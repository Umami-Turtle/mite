import { ExtensionMetadata, extensionSchema } from "./schemas";
import { fetch } from "@tauri-apps/plugin-http";

const loadRemoteExtensionFromURL = async (extensionBundledJSURL: string) => {
  const res = await fetch(extensionBundledJSURL, { method: "GET" });
  const rawExtensionCode = await res.text();
  console.log("Look what i got!\n", rawExtensionCode);
  const rawExtension = eval(rawExtensionCode)?.default;
  console.log("Raw girl", rawExtension);
  const response = extensionSchema.safeParse(rawExtension);
  if (!response.success) {
    console.log("Failed to load extension");
    return;
  }
  console.log("Extension parsed successfully, loading...");
  const extension = response.data;
  console.log("Extension:", extension);
  return extension;
};

const EXTENSION_URL_BASE =
  "https://github.com/Umami-Turtle/mite/raw/main/extensions/";

const EXTENSION_LIST_URL = EXTENSION_URL_BASE + "index.json";

export const loadRemoteExtension = async (
  extensionMetadata: ExtensionMetadata,
) => {
  const extensionBundledJSURL = `${EXTENSION_URL_BASE}${extensionMetadata.id}/index.js`;
  return await loadRemoteExtensionFromURL(extensionBundledJSURL);
};

export const fetchRemoteExtensionList = async () => {
  const response = await fetch(EXTENSION_LIST_URL, { method: "GET" });
  const data = await response.json();
  return data.extensions as ExtensionMetadata[];
};
