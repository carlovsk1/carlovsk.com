"use client";

import { useRef, useState, type ReactNode } from "react";
import { X } from "@/components/icons";

/**
 * Wraps any thumbnail in a click-to-expand modal. A native <dialog> gives centring, focus
 * trapping, an inert page behind, ::backdrop and Escape-to-close for free.
 */
export default function Expandable({ src, alt, children }: { src: string; alt: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <button
        type="button"
        className="athos-shot-trigger"
        aria-label={`Expand: ${alt}`}
        onClick={() => {
          setLoaded(true);
          dialog.current?.showModal();
        }}
      >
        {children}
      </button>

      <dialog
        ref={dialog}
        className="athos-lightbox"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="athos-lightbox-inner">
          {/* Mounted on first open and left cached after. `loading="lazy"` cannot work here: a
              closed dialog is display:none, so the image would never enter the viewport and never
              load at all. The original file rather than a resized variant is the point of
              expanding, so it must not be paid for by everyone who never clicks. */}
          {loaded ? <img src={src} alt={alt} /> : null}
          <button
            type="button"
            className="athos-lightbox-close"
            aria-label="Close"
            onClick={() => dialog.current?.close()}
          >
            <X size="16px" />
          </button>
        </div>
      </dialog>
    </>
  );
}
