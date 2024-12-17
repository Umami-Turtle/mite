import { twj } from "tw-to-css";
import { renderToStaticMarkup } from "react-dom/server";
import { ReactNode } from "react";

export const FIELDS = {
  word: "{{word}}",
  sentence: "{{sentence}}",
  definition: "{{definition}}",
  article: "{{article}}",
  extra: "{{extra}}",
  example_sentence_1: "{{example_sentence_1}}",
  example_translation_1: "{{example_translation_1}}",
  example_audio_1: "{{example_audio_1}}",
  example_sentence_2: "{{example_sentence_2}}",
  example_translation_2: "{{example_translation_2}}",
  example_audio_2: "{{example_audio_2}}",
  pronunciation: "{{pronunciation}}",
  image: "{{image}}",
  source: "{{source",
} as const;

export const FlashcardFront = (
  <div style={twj("p-5 text-center")}>
    <div>{FIELDS.image}</div>
    <p style={twj("text-lg")}>{FIELDS.sentence}</p>
    <h1 style={twj("text-3xl font-bold")}>{FIELDS.word}</h1>
  </div>
);

export const FlashcardBack = (
  <div style={twj("p-5 text-center")}>
    {FlashcardFront}
    <p style={twj("text-lg")}>{FIELDS.pronunciation}</p>
    <p style={twj("text-lg")}>{FIELDS.definition}</p>
    <div style={twj("flex flex-col gap-2 max-w-screen-sm mx-auto")}>
      <div>
        <div style={twj("font-bold")}>{FIELDS.example_sentence_1}</div>
        <div style={twj("font-bold opacity-50")}>
          {FIELDS.example_translation_1}
        </div>
        <audio controls>
          <source src={FIELDS.example_audio_1} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div>
        <div style={twj("font-bold")}>{FIELDS.example_sentence_2}</div>
        <div style={twj("font-bold opacity-50")}>
          {FIELDS.example_translation_2}
        </div>
        <audio controls>
          <source src={FIELDS.example_audio_2} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  </div>
);

const toHTML = (jsx: ReactNode) => renderToStaticMarkup(jsx, {});

export const flashcardFrontHTML = toHTML(FlashcardFront);
export const flashcardBackHTML = toHTML(FlashcardBack);
