import fs from "fs/promises";
import path from "path";

async function build(filePath: string) {
  const fileFolder = path.dirname(filePath);
  const targetFolder = path.join(".", fileFolder);

  await fs.mkdir(targetFolder, { recursive: true });

  // @ts-ignore
  await Bun.build({
    entrypoints: [filePath],
    outdir: targetFolder,
    minify: true,
    splitting: false,
    target: "browser",
    sourcemap: "none",
    format: "esm",
  });
  console.log(`Built ${filePath} to ${targetFolder}`);
}

await build("./extensions/mite-base/index.tsx");
