export const PAL = {
  bg: "#0B2B25",
  leaf: "#123A31",
  sand: "#F4EDE0",
  yellow: "#F5B841",
  /** Reads on the sand ground and behind sand text (5.07:1 both ways). */
  blue: "#2762BC",
  /** The same hue lifted for small text on the dark greens, where `blue` only reaches 3:1. */
  blueInk: "#7FB0F2",
} as const;

export const RADIUS = {
  block: "14px",
  chip: "8px",
  mark: "3px",
} as const;

/**
 * Accents double as tile fills and as text colours. Blue is the one that cannot do both,
 * so anything drawing an accent as *text on a dark ground* has to route through here.
 */
export const onDark = (c: string) => (c === PAL.blue ? PAL.blueInk : c);

/**
 * Text colours over the two dark grounds. Each is the lowest opacity that still clears
 * 4.5:1, so nothing here is a decorative guess.
 */
export const INK = {
  /** Body copy and captions. 7.08:1 on bg, 6.10:1 on leaf. */
  soft: "rgba(244,237,224,0.7)",
  /** Eyebrows, indices, metadata. 5.84:1 on bg, 5.15:1 on leaf. */
  faint: "rgba(244,237,224,0.62)",
} as const;

export const FONT_MONO = "var(--font-plex-mono), monospace";
export const FONT_BLACK = "var(--font-archivo-black), sans-serif";
export const FONT_SANS = "var(--font-archivo), sans-serif";
