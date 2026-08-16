import { ImageResponse } from "next/og";
import { PAL } from "@/lib/palette";

export const alt = "CARLOVSK · Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TILE = 90;
const COLS = Math.ceil(size.width / TILE);
const ROWS = Math.ceil(size.height / TILE);
const FACES = [PAL.leaf, PAL.leaf, PAL.sand, PAL.yellow, PAL.blue, PAL.leaf, PAL.sand];

// Deterministic so the card is byte-identical across rebuilds.
const hash = (n: number) => (n * 2654435761) % 4294967296;

// Satori cannot read woff2, so ask Google for the truetype variant with a legacy UA.
async function archivoBlack(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Archivo+Black", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko" },
    }).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await archivoBlack();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: PAL.bg }}>
        {/* Satori has no `inset` shorthand: without explicit sizing the grid never wraps. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
          }}
        >
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const h = hash(i + 1);
            return (
              <div
                key={i}
                style={{
                  width: TILE,
                  height: TILE,
                  display: "flex",
                  transform: `rotate(${(h % 4) * 90}deg)`,
                  background: `linear-gradient(45deg, ${FACES[h % FACES.length]} 50%, transparent 50%)`,
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            background: `linear-gradient(100deg, ${PAL.bg} 0%, ${PAL.bg} 34%, rgba(11,43,37,0.92) 52%, rgba(11,43,37,0.55) 78%, rgba(11,43,37,0.35) 100%)`,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 72,
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", width: 132, height: 10, background: PAL.yellow, marginBottom: 34 }} />
          <div
            style={{
              display: "flex",
              fontFamily: font ? "Archivo Black" : undefined,
              fontSize: 168,
              lineHeight: 1,
              letterSpacing: -4,
              color: PAL.sand,
            }}
          >
            CARLOVSK
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              maxWidth: 700,
              fontSize: 31,
              lineHeight: 1.35,
              color: "rgba(244,237,224,0.82)",
            }}
          >
            Software engineer. He never fell in love with code. He fell in love with the experience.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Archivo Black", data: font, style: "normal", weight: 400 }] : undefined,
    },
  );
}
