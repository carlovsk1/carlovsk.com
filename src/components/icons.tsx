/**
 * Phosphor geometry, drawn inline. The site uses exactly one icon in eight places, so
 * @phosphor-icons/react would be a dependency and a client boundary bought for a single glyph.
 *
 * The viewBox is cropped to the drawn area (Phosphor's 256 grid leaves ~25% padding on every
 * side), so `1em` here means one em of visible arrow instead of half of one. That is what makes
 * it sit at cap height next to text rather than looking like a shrunken superscript.
 */

const BOX = "46 46 164 164";

/** One step per type weight in use, so an icon never out-weighs or under-weighs its label. */
const STROKE = {
  regular: 18, // Archivo 400
  bold: 26, // Archivo 600
  black: 34, // Archivo Black
} as const;

type IconProps = {
  weight?: keyof typeof STROKE;
  size?: string;
};

const base = (weight: keyof typeof STROKE, size: string) =>
  ({
    viewBox: BOX,
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: STROKE[weight],
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
  }) as const;

export function ArrowUpRight({ weight = "regular", size = "0.9em" }: IconProps) {
  return (
    // Centres the glyph on the text's cap height instead of its baseline.
    <svg {...base(weight, size)} style={{ flex: "none", verticalAlign: "-0.09em" }}>
      <line x1="64" y1="192" x2="192" y2="64" />
      <polyline points="88 64 192 64 192 168" />
    </svg>
  );
}

export function X({ weight = "bold", size = "0.9em" }: IconProps) {
  return (
    <svg {...base(weight, size)} style={{ flex: "none" }}>
      <line x1="64" y1="64" x2="192" y2="192" />
      <line x1="192" y1="64" x2="64" y2="192" />
    </svg>
  );
}
