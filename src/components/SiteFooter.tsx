import { ArrowUpRight } from "@/components/icons";
import { FONT_BLACK, FONT_MONO, PAL, RADIUS } from "@/lib/palette";

const EMAIL = "carlovsk.edits@gmail.com";

const ELSEWHERE = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/carlovsk", text: "in/carlovsk" },
  { label: "GITHUB", href: "https://github.com/carlovsk1", text: "github.com/carlovsk1" },
];

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      className="athos-footer"
      style={{
        background: PAL.sand,
        color: PAL.bg,
        padding: "clamp(56px,7vw,100px) clamp(24px,6vw,96px) clamp(28px,3vw,48px)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            margin: 0,
            maxWidth: "13ch",
            fontFamily: FONT_BLACK,
            fontSize: "clamp(40px,7vw,104px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          What are you building?
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "clamp(18px,2.4vw,36px)",
            marginTop: "clamp(28px,3.2vw,44px)",
          }}
        >
          <a
            className="athos-cta"
            href={`mailto:${EMAIL}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 26px",
              borderRadius: RADIUS.chip,
              fontSize: "clamp(17px,1.5vw,21px)",
              fontWeight: 600,
            }}
          >
            {EMAIL}
            <ArrowUpRight weight="bold" />
          </a>
          {ELSEWHERE.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "clamp(15px,1.2vw,17px)" }}
            >
              {c.text}
              <ArrowUpRight />
            </a>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
            marginTop: "clamp(56px,7vw,110px)",
            paddingTop: 24,
            borderTop: "2px solid rgba(11,43,37,0.22)",
          }}
        >
          <div style={{ fontFamily: FONT_BLACK, fontSize: "clamp(30px,4.4vw,64px)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
            CARLOVSK
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
              fontFamily: FONT_MONO,
              fontSize: 13,
              lineHeight: 1.5,
              color: "rgba(11,43,37,0.7)",
            }}
          >
            <span>Carlos Gonçalves · software engineer · Brazil</span>
            <span>The wall is still going up.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
