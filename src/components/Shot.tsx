import Image from "next/image";
import Expandable from "@/components/Expandable";
import { INK, PAL, RADIUS } from "@/lib/palette";

const FRAME = (ratio: string) =>
  ({
    position: "relative",
    aspectRatio: ratio,
    background: PAL.leaf,
    outline: "1px solid rgba(244,237,224,0.18)",
    borderRadius: RADIUS.block,
    overflow: "hidden",
  }) as const;

// Captions are sentences, not metadata: mono at 12px and 50% made them the hardest prose to read.
const CAPTION = {
  margin: "12px 0 0",
  maxWidth: "78ch",
  fontSize: 14,
  lineHeight: 1.55,
  color: INK.soft,
  textWrap: "pretty",
} as const;

export default function Shot({
  src,
  alt,
  caption,
  ratio = "1368 / 855",
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
}) {
  return (
    <div>
      <Expandable src={src} alt={alt}>
        <div style={FRAME(ratio)}>
          {/* 2400px lets a retina screen pull the full-resolution source instead of a downscaled
              1200 variant that then gets stretched back up. */}
          <Image
            src={src}
            alt={alt}
            fill
            quality={92}
            sizes="(max-width: 1200px) 100vw, 2400px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Expandable>
      {caption ? <p style={CAPTION}>{caption}</p> : null}
    </div>
  );
}
