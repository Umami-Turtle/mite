import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { useHotkeys } from "react-hotkeys-hook";

export const Route = createFileRoute("/media/copy-arena")({
  component: RouteComponent,
});

function RouteComponent() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");
  useHotkeys("ctrl+m", () => {
    ref.current?.focus();
  });
  useEffect(() => {
    let unlisten: null | (() => any) = null;
    listen<string>("clipboard", ({ payload: text }) => {
      console.log("Clipboard Updated!", text);
      setValue(text);
    }).then((ul) => {
      unlisten = ul;
    });
    return () => {
      unlisten?.();
    };
  }, []);

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ctrl+M to focus"
        ref={ref}
      />
    </div>
  );
}
