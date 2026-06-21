"use client";

import { useEffect, useState } from "react";
import { personal } from "@/data/personal";

type Props = {
  initials?: string;
  caption?: string;
  src?: string;
};

export function Portrait({ initials = "AR", caption = "Asad ur Rehman", src = "/portrait.jpg" }: Props) {
  const [imgState, setImgState] = useState<"checking" | "ok" | "missing">("checking");

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgState("ok");
    img.onerror = () => setImgState("missing");
    img.src = src;
  }, [src]);

  return (
    <figure className="relative">
      <div className="relative aspect-[4/5] w-full max-w-[20rem] mx-auto overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
        {imgState === "ok" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={caption}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-muted to-accent-2-muted">
            <span className="font-display font-bold text-6xl text-accent/40 tracking-tighter">
              {initials}
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-4 text-center">
        <p className="font-display font-semibold text-foreground">{caption}</p>
        <p className="font-mono text-xs text-muted mt-1">{personal.currentRole}</p>
      </figcaption>
    </figure>
  );
}
