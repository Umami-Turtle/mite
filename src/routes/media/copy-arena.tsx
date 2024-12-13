import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
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
