import z from "zod";
import { reactComponentSchema } from "./utils";

export type Version = `${number}.${number}.${number}${"a" | "b" | ""}`;
export const versionSchema = z
  .string()
  .refine((v) => /^\d+\.\d+\.\d+[ab]?$/.test(v));

export const metadataSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  version: versionSchema,
  description: z.string(),
});

export const flashSkeletonProviderSchema = z.object({
  providerId: z.string().uuid(),
  inputSchema: z.any(),
  ankiModelConfig: z.object({
    cardTemplates: z.array(
      z
        .object({
          Front: z.string(),
          Back: z.string(),
        })
        .catchall(z.string()), // captures any additional string keys
    ),
    css: z.string().optional(),
    inOrderFields: z.array(z.string()),
    isCloze: z.boolean().optional(),
  }),
  fn: z.function(z.tuple([z.array(z.any())]), z.promise(z.any())),
});

export const textQueryVisualResponseSchema = z.object({
  type: z.literal("visual"),
  component: reactComponentSchema,
});
export const textQueryFlashcardResponseSchema = z.object({
  type: z.literal("flashcard"),
  data: z.any(),
});

export const textQueryResponseSchema = z.union([
  textQueryVisualResponseSchema,
  textQueryFlashcardResponseSchema,
]);

export const textQueryProviderSchema = z.object({
  inputSchema: z.any(),
  supportedFlashcardSkeletons: z.array(z.string().uuid()),
  fn: z.function(
    z.tuple([
      z.string(), // <- Query
      z.string().uuid(), // <- Target FlashcardSkeletonId
    ]),
    z.promise(z.array(textQueryResponseSchema)),
  ),
});

export const extensionSchema = z.object({
  metadata: metadataSchema,
  flashcardSkeletonProvider: flashSkeletonProviderSchema.optional(),
  textQueryProvider: textQueryProviderSchema.optional(),
});
export type Extension = z.infer<typeof extensionSchema>;

export const extensionFeatures = [
  "flashcardSkeletonProvider",
  "textQueryProvider",
] as const;
export const extensionFeatureSchema = z.union(
  // @ts-ignore
  extensionFeatures.map((v) => z.literal(v)),
);
export type ExtensionFeature = (typeof extensionFeatures)[number];
