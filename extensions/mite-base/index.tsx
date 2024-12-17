import type { Extension } from "@/lib/extensions/schemas";
import { z } from "zod";
import { FIELDS, flashcardBackHTML, flashcardFrontHTML } from "./flashcard";

const flashcardInputSchema = z.object({
  definitions: z.string().array().optional(),
  article: z.string().optional(),
  audioBase64: z.string().base64url().optional(),
  imageBase64: z.string().base64url().optional(),

  examples: z
    .object({
      sentence: z.string(),
      translation: z.string(),
      audio: z.string().base64url(),
    })
    .array()
    .optional(),
});

type FlashcardInput = z.infer<typeof flashcardInputSchema>;

let extension = {
  flashcardSkeletonProvider: {
    ankiModelConfig: {
      cardTemplates: [
        {
          Front: flashcardFrontHTML,
          Back: flashcardBackHTML,
        },
      ],
      inOrderFields: [],
      css: `
      img {
        max-width: 200px;
        height: auto;
        margin-inline: auto;
        display: block;
      }
      `,
      isCloze: false,
    },
    inputSchema: flashcardInputSchema,
    fn: async (word, context, source, rawInputs) => {
      const data = {
        definitions: [] as string[],
        article: "",
        examples: [] as NonNullable<FlashcardInput["examples"]>,
        image: "",
        pronunciation: "",
      };

      for (let rawInput of rawInputs) {
        const { data: input, success } =
          flashcardInputSchema.safeParse(rawInput);
        if (!success) continue;

        if (input.definitions && input.definitions.length > 0)
          data.definitions = Array.from(
            new Set([...data.definitions, ...input.definitions]),
          );
        if (input.article) data.article = input.article;
        if (input.examples) {
          data.examples = [
            ...data.examples,
            ...input.examples?.map((example) => ({
              sentence: example.sentence,
              translation: example.translation,
              audio: example.audio,
            })),
          ];
        }
        if (input.audioBase64) data.pronunciation = input.audioBase64;
        if (input.imageBase64) data.image = input.imageBase64;
      }

      return {
        word,
        sentence: context || "",
        article: data.article,
        definition: data.definitions.join(", "),
        example_sentence_1: data.examples[0]?.sentence,
        example_translation_1: data.examples[0]?.translation,
        example_audio_1: data.examples[0]?.audio,
        example_sentence_2: data.examples[1]?.sentence,
        example_translation_2: data.examples[1]?.translation,
        example_audio_2: data.examples[1]?.audio,
        image: data.image,
        pronunciation: data.pronunciation,
        source: source || "",
        extra: "",
      } as Record<keyof typeof FIELDS, string>;
    },
  },
} satisfies Extension;

extension;
