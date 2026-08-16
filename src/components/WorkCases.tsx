import Image from "next/image";
import Shot from "@/components/Shot";
import Expandable from "@/components/Expandable";
import { FONT_BLACK, FONT_MONO, INK, PAL, RADIUS, onDark } from "@/lib/palette";

const ALSO_SHIPPED = [
  { title: "Hello Maia", year: "2025", image: "/images/projects/hello-maia.webp" },
  { title: "Fynance", year: "2025", image: "/images/projects/fynance.png" },
  { title: "Eu Na Europa", year: "2024", image: "/images/projects/eu-na-europa.png" },
  { title: "Vetzco", year: "2024", image: "/images/projects/vetzco.png" },
  { title: "Mult Resorts", year: "2023", image: "/images/projects/mult-resorts.png" },
];

const HEADER_ROW = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: 24,
  flexWrap: "wrap",
  paddingBottom: 18,
  borderBottom: "2px solid rgba(244,237,224,0.18)",
} as const;

const CASE_ROW = {
  display: "flex",
  flexWrap: "wrap",
  gap: "clamp(24px,5vw,72px)",
  alignItems: "flex-start",
  paddingBottom: "clamp(30px,3.4vw,44px)",
} as const;

const CASE_MARK = (color: string) =>
  ({
    flex: "none",
    width: 14,
    height: 14,
    background: `linear-gradient(45deg,${color} 50%,transparent 50%)`,
    borderRadius: RADIUS.mark,
  }) as const;

const CASE_LABEL = {
  fontFamily: FONT_MONO,
  fontSize: 11,
  letterSpacing: "0.22em",
  color: INK.faint,
} as const;

const CASE_TITLE = {
  margin: 0,
  fontFamily: FONT_BLACK,
  fontSize: "clamp(28px,3.2vw,50px)",
  lineHeight: 1.02,
  letterSpacing: "-0.015em",
} as const;

const CASE_TEXT = {
  margin: 0,
  fontSize: "clamp(17px,1.85vw,25px)",
  lineHeight: 1.5,
  color: PAL.sand,
  textWrap: "pretty",
} as const;

const MEDIA_BAND = {
  display: "flex",
  flexDirection: "column",
  gap: "clamp(30px,3.4vw,44px)",
  paddingBottom: "clamp(44px,6vw,80px)",
} as const;

const STACK_LINE = {
  margin: 0,
  fontFamily: FONT_MONO,
  fontSize: 12,
  letterSpacing: "0.08em",
  color: INK.faint,
} as const;

function CaseHead({
  n,
  color,
  title,
  meta,
  children,
}: {
  n: string;
  color: string;
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div style={CASE_ROW}>
      <div style={{ flex: "1 1 230px", maxWidth: 360 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <span style={CASE_MARK(color)} />
          <span style={CASE_LABEL}>{n}</span>
        </div>
        <h3 style={CASE_TITLE}>{title}</h3>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.14em", color: onDark(color), marginTop: 16 }}>
          {meta}
        </div>
      </div>
      <div style={{ flex: "3 1 min(100%,420px)" }}>
        <p style={CASE_TEXT}>{children}</p>
      </div>
    </div>
  );
}

export default function WorkCases() {
  return (
    <section id="work" style={{ padding: "clamp(72px,10vw,140px) clamp(24px,6vw,96px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={HEADER_ROW}>
          <h2 style={{ margin: 0, fontFamily: FONT_MONO, fontSize: 12, fontWeight: 400, letterSpacing: "0.22em", color: PAL.yellow }}>
            THE WORK
          </h2>
          <p style={{ margin: 0, fontFamily: FONT_MONO, fontSize: 13, letterSpacing: "0.06em", color: INK.faint }}>
            three products · what he decided, not what he used
          </p>
        </div>

        <div style={{ paddingTop: "clamp(44px,6vw,80px)" }}>
          <CaseHead n="CASE 01" color={PAL.blue} title="R.E. Cost Seg" meta="2026 · product engineer">
            Cost segregation is a high-ticket service, the kind people buy on a call with a human. He shipped
            self-checkout for it anyway, then spent four days on the part no user will ever see: every way the flow
            could take someone’s money and give nothing back.
          </CaseHead>
          <div style={MEDIA_BAND}>
            <Shot
              src="/images/projects/recs-workflows.png"
              alt="Make Core workflow health surface, showing run volume, failure rate, p95 duration and per-workflow activity sparklines"
              caption="Make Core. The engine that replaced Make, Zapier and HubSpot, and the surface his own team opens when something breaks."
            />
            <Shot
              src="/images/projects/recs-estimate.png"
              alt="Client estimate screen showing projected tax savings, a depreciation comparison table and the two paths to buy"
              caption="The estimate a client reads before deciding to buy, with no salesperson on the call."
            />
            <Shot
              src="/images/projects/recs-questionnaire.png"
              alt="Guided questionnaire showing one sub-step at a time, a Why we ask card, and a read-only notice on a study already submitted to engineering"
              caption="The questionnaire in guided mode: one sub-step at a time, with the reason a tax question is being asked written by Customer Success, not by an engineer."
            />
            <p style={STACK_LINE}>Next.js · React · TypeScript · Supabase · Stripe</p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(244,237,224,0.18)", paddingTop: "clamp(44px,6vw,80px)" }}>
          <CaseHead n="CASE 02" color={PAL.yellow} title="arOS" meta="2025 · agent core · 30,000 users">
            A multi-agent marketing OS that reached 30,000 users. He built the agent core: the part every other
            feature depends on.
          </CaseHead>
          <div style={MEDIA_BAND}>
            <Shot src="/images/projects/aros.webp" alt="arOS product shot" />
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(244,237,224,0.18)", paddingTop: "clamp(44px,6vw,80px)" }}>
          <CaseHead n="CASE 03" color={PAL.sand} title="FixaAí" meta="2024 · founder · 1,000 users">
            He founded FixaAí: AI-generated flashcards for students studying for the Brazilian vestibular, written in
            the shape of the questions the real exams ask. Zero to a thousand people studying with it.
          </CaseHead>
          <div style={MEDIA_BAND}>
            <Shot src="/images/projects/fixaai.png" alt="FixaAí product shot" />
          </div>
        </div>

        <div style={{ paddingTop: "clamp(44px,5vw,68px)", borderTop: "2px solid rgba(244,237,224,0.18)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            <span style={CASE_LABEL}>ALSO SHIPPED</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: INK.faint }}>client work · 2023 to 2025</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,170px),1fr))",
              gap: 2,
              marginTop: 14,
            }}
          >
            {ALSO_SHIPPED.map((p) => (
              <div
                key={p.title}
                style={{
                  background: PAL.bg,
                  outline: "1px solid rgba(244,237,224,0.18)",
                  borderRadius: RADIUS.block,
                  overflow: "hidden",
                }}
              >
                <Expandable src={p.image} alt={p.title}>
                  <div style={{ position: "relative", aspectRatio: "4/3", background: PAL.leaf }}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 900px) 50vw, 320px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Expandable>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "14px 12px" }}>
                  <span style={{ fontWeight: 600, fontSize: 16 }}>{p.title}</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: INK.faint }}>{p.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
