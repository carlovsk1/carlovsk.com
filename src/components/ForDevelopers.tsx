import { ArrowUpRight } from "@/components/icons";
import { FONT_BLACK, FONT_MONO, INK, PAL, RADIUS, onDark } from "@/lib/palette";

type Item = {
  title: string;
  proof: string;
  accent: string;
  text: string;
  href?: string;
};

const ITEMS: Item[] = [
  {
    title: "AutoBubble",
    proof: "IN PRODUCTION",
    accent: PAL.blue,
    text: "Writing a Bubble plugin meant hours of trial and error, and editing one meant reading somebody else's undocumented code. So he built the thing that generates, edits and ships them, and gave it to the people he came from.",
    href: "https://forum.bubble.io/t/introducing-autobubble-build-and-ship-bubble-plugins-with-ai/393797",
  },
  {
    title: "product-ui",
    proof: "MIT · SKILL",
    accent: PAL.yellow,
    text: "A Claude Code skill for the visual layer of an interface, built on one rule: every value comes from the design system, none get invented. Taste, written down as something a machine can follow.",
    href: "https://github.com/carlovsk1/product-ui",
  },
  {
    title: "product-ux",
    proof: "MIT · SKILL",
    accent: PAL.sand,
    text: "The same idea pointed at flows. It holds onboarding, signup and pricing to six behavioral principles, and refuses to ship a dark pattern.",
    href: "https://github.com/carlovsk1/product-ux",
  },
  {
    title: "easytimer",
    proof: "SWIFT · MIT",
    accent: PAL.yellow,
    text: "The macOS menu-bar timer he used went paid. He wrote a free one that evening and left it open source.",
    href: "https://github.com/carlovsk1/easytimer",
  },
  {
    title: "carlovsk.com",
    proof: "READ THE SOURCE",
    accent: PAL.blue,
    text: "This page. The wall, the tides and the counters are canvas written by hand, in Next.js and TypeScript. The code is open.",
    href: "https://github.com/carlovsk1/carlovsk.com",
  },
];

const TITLE = {
  margin: 0,
  fontFamily: FONT_BLACK,
  fontSize: "clamp(21px,2.1vw,30px)",
  lineHeight: 1.1,
  letterSpacing: "-0.01em",
  color: PAL.sand,
} as const;

const PROOF = {
  fontFamily: FONT_MONO,
  fontSize: 13,
  letterSpacing: "0.16em",
  whiteSpace: "nowrap",
  padding: "6px 11px",
  borderRadius: RADIUS.chip,
  background: "rgba(11,43,37,0.55)",
} as const;

const TEXT = {
  margin: "10px 0 0",
  maxWidth: "72ch",
  fontSize: "clamp(15px,1.35vw,18px)",
  lineHeight: 1.55,
  color: INK.soft,
  textWrap: "pretty",
} as const;

export default function ForDevelopers() {
  return (
    <section id="open-source" style={{ padding: "clamp(72px,10vw,140px) clamp(24px,6vw,96px)", background: PAL.leaf }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 24,
            flexWrap: "wrap",
            paddingBottom: 18,
            borderBottom: "2px solid rgba(244,237,224,0.18)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: FONT_MONO,
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.22em",
              color: PAL.yellow,
            }}
          >
            FOR DEVELOPERS
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: FONT_MONO,
              fontSize: 13,
              letterSpacing: "0.06em",
              color: INK.faint,
            }}
          >
            things he built for people who read the source
          </p>
        </div>

        <ul className="athos-proof">
          {ITEMS.map((it) => {
            const body = (
              <>
                <span
                  className="athos-proof-mark"
                  style={{ background: `linear-gradient(45deg,${onDark(it.accent)} 50%,transparent 50%)` }}
                />
                <span className="athos-proof-body">
                  <h3 style={{ ...TITLE, display: "flex", alignItems: "center", gap: 10 }}>
                    {it.title}
                    {it.href ? <ArrowUpRight weight="black" /> : null}
                  </h3>
                  <p style={TEXT}>{it.text}</p>
                </span>
                <span className="athos-proof-chip" style={{ ...PROOF, color: onDark(it.accent) }}>
                  {it.proof}
                </span>
              </>
            );
            return (
              <li key={it.title}>
                {it.href ? (
                  <a className="athos-proof-row" href={it.href} target="_blank" rel="noopener">
                    {body}
                  </a>
                ) : (
                  <div className="athos-proof-row">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
