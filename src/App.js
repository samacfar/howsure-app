import React, { useState } from "react";
import "./App.css";

const C = {
  bg: "#F5F2EC",
  card: "#FFFFFF",
  green: "#2D5A3D",
  greenLight: "#EAF2EC",
  accent: "#E8845C",
  text: "#1A1A1A",
  muted: "#6B7280",
  border: "#E2DDD5",
  warn: "#FEF3C7",
  warnBorder: "#F59E0B",
  warnText: "#92400E",
};

const SCREENS = [
  { id: 1, icon: "👥", title: "Household" },
  { id: 2, icon: "📍", title: "Location" },
  { id: 3, icon: "⚠️", title: "Risks" },
  { id: 4, icon: "🛒", title: "Stores" },
  { id: 5, icon: "🍽️", title: "Dietary" },
  { id: 6, icon: "📦", title: "Food Plan" },
  { id: 7, icon: "📅", title: "Duration" },
];

function Stepper({ label, sub, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <button onClick={() => onChange(Math.max(0, value - 1))} style={{
          width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${C.border}`,
          background: C.bg, fontSize: 24, cursor: "pointer", color: C.green,
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
        }}>−</button>
        <span style={{ fontSize: 20, fontWeight: 700, minWidth: 28, textAlign: "center" }}>{value}</span>
        <button onClick={() => onChange(value + 1)} style={{
          width: 44, height: 44, borderRadius: "50%", border: "none",
          background: C.green, fontSize: 24, cursor: "pointer", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
        }}>+</button>
      </div>
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 20, marginBottom: 14, ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, marginBottom: 12 }}>
      {children}
    </div>
  );
}

function InfoBox({ children, color = C.warn, borderColor = C.warnBorder, textColor = C.warnText }) {
  return (
    <div style={{ background: color, border: `1px solid ${borderColor}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14, fontSize: 13, color: textColor, lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

function ScreenHeading({ title, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "0 0 8px", fontFamily: "Georgia, serif" }}>{title}</h2>
      <p style={{ fontSize: 15, color: C.muted, margin: 0, lineHeight: 1.5 }}>{sub}</p>
    </div>
  );
}

// --- SCREEN 1: Household ---
function S1({ d, set }) {
  const u = (k, v) => set(p => ({ ...p, [k]: v }));
  return (
    <>
      <ScreenHeading title="Who are we planning for?" sub="This sets your food, water and supply amounts." />
      <Card>
        <SectionLabel>People</SectionLabel>
        <Stepper label="Adults" sub="18 years and over" value={d.adults ?? 2} onChange={v => u("adults", v)} />
        <Stepper label="Children" sub="5–17 years" value={d.children ?? 0} onChange={v => u("children", v)} />
        <Stepper label="Toddlers" sub="Under 5 years" value={d.toddlers ?? 0} onChange={v => u("toddlers", v)} />
        <Stepper label="Elderly" sub="Reduced mobility / special needs" value={d.elderly ?? 0} onChange={v => u("elderly", v)} />
      </Card>
      <Card>
        <SectionLabel>Pets</SectionLabel>
        <Stepper label="🐕 Dogs" value={d.dogs ?? 0} onChange={v => u("dogs", v)} />
        <Stepper label="🐈 Cats" value={d.cats ?? 0} onChange={v => u("cats", v)} />
        <div style={{ fontSize: 12, color: C.muted, marginTop: 10 }}>Other pets can be added after setup.</div>
      </Card>
    </>
  );
}

// --- SCREEN 2: Location ---
function S2({ d, set }) {
  return (
    <>
      <ScreenHeading title="Where is your property?" sub="Helps us find nearby hazards, water sources and supermarkets automatically." />
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ height: 220, background: "linear-gradient(160deg,#b8d4b0,#8ab890,#6a9e78)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.2 }} viewBox="0 0 400 220">
            {[0,50,100,150,200,250,300,350,400].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="#fff" strokeWidth="1"/>)}
            {[0,55,110,165,220].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#fff" strokeWidth="1"/>)}
            <path d="M60,80 Q130,50 200,90 Q260,120 320,70 L320,160 Q250,180 180,165 Q110,148 60,168 Z" fill="#4a8a5a" opacity="0.4"/>
          </svg>
          <div style={{ zIndex: 2, textAlign: "center" }}>
            <div style={{ fontSize: 44 }}>📍</div>
            <div style={{ background: C.green, color: "#fff", borderRadius: 10, padding: "8px 20px", fontSize: 14, fontWeight: 700, marginTop: 8 }}>
              Tap to place your pin
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(255,255,255,0.93)", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: "#1a6aaa", fontWeight: 700 }}>💧 River 2.1km</div>
          <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(255,255,255,0.93)", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: C.green, fontWeight: 700 }}>↕ 180m elev.</div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg, borderRadius: 12, padding: "14px", border: `1.5px solid ${C.border}`, marginBottom: 10 }}>
            <span>🔍</span>
            <span style={{ fontSize: 15, color: C.muted }}>Search your address...</span>
          </div>
          <div style={{ background: C.greenLight, borderRadius: 10, padding: "13px 14px", fontSize: 15, color: C.green, fontWeight: 600, textAlign: "center" }}>
            📍 Use my current location
          </div>
        </div>
      </Card>
      <Card>
        <SectionLabel>Auto-detected from your pin</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["📍 Canterbury Region", "🌾 Rural", "↕ 180m elevation", "💧 River 2.1km"].map(t => (
            <div key={t} style={{ background: C.greenLight, color: C.green, borderRadius: 99, padding: "6px 14px", fontSize: 13, fontWeight: 600 }}>{t}</div>
          ))}
        </div>
      </Card>
    </>
  );
}

// --- SCREEN 3: Risk Profile ---
function S3({ d, set }) {
  const risks = [
    { id: "earthquake", icon: "🏔️", label: "Earthquake" },
    { id: "tsunami", icon: "🌊", label: "Tsunami" },
    { id: "flood", icon: "🌧️", label: "Flooding" },
    { id: "volcanic", icon: "🌋", label: "Volcanic" },
    { id: "landslip", icon: "🪨", label: "Landslip" },
    { id: "storm", icon: "🌀", label: "Severe Storm" },
    { id: "wildfire", icon: "🔥", label: "Wildfire" },
    { id: "isolation", icon: "🚧", label: "Supply Cut-off" },
  ];
  const sel = d.risks ?? ["earthquake", "isolation"];
  const toggle = id => set(p => ({ ...p, risks: sel.includes(id) ? sel.filter(r => r !== id) : [...sel, id] }));
  return (
    <>
      <ScreenHeading title="What risks apply to you?" sub="Pre-filled from your location — adjust to match your situation." />
      <InfoBox>📍 Canterbury detected — earthquake and supply cut-off risk auto-selected</InfoBox>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {risks.map(r => {
          const on = sel.includes(r.id);
          return (
            <button key={r.id} onClick={() => toggle(r.id)} style={{
              background: on ? C.greenLight : C.card,
              border: `2px solid ${on ? C.green : C.border}`,
              borderRadius: 16, padding: "18px 12px", cursor: "pointer", textAlign: "left",
            }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{r.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: on ? C.green : C.text }}>{r.label}</div>
              {on && <div style={{ fontSize: 11, color: C.green, fontWeight: 700, marginTop: 4 }}>✓ Selected</div>}
            </button>
          );
        })}
      </div>
    </>
  );
}

// --- SCREEN 4: Supermarkets ---
function S4({ d, set }) {
  const stores = [
    { id: "woolworths", emoji: "🟢", name: "Woolworths NZ", dist: "3.2km", tag: "Closest to you" },
    { id: "newworld", emoji: "🔴", name: "New World", dist: "5.8km", tag: "Online delivery available" },
    { id: "paknsave", emoji: "🟡", name: "Pak'nSave", dist: "8.1km", tag: "Best value" },
  ];
  const sel = d.store ?? "woolworths";
  return (
    <>
      <ScreenHeading title="Your nearest supermarkets" sub="Found from your location. Pick where you'd prefer to shop." />
      {stores.map(s => {
        const on = sel === s.id;
        return (
          <button key={s.id} onClick={() => set(p => ({ ...p, store: s.id }))} style={{
            width: "100%", background: on ? C.greenLight : C.card,
            border: `2px solid ${on ? C.green : C.border}`,
            borderRadius: 16, padding: "18px", marginBottom: 10, cursor: "pointer", textAlign: "left",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{ fontSize: 34 }}>{s.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: on ? C.green : C.text }}>{s.name}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{s.dist} · {s.tag}</div>
            </div>
            {on && <div style={{ fontSize: 22, color: C.green }}>✓</div>}
          </button>
        );
      })}
      <InfoBox color={C.greenLight} borderColor={C.green} textColor={C.green}>
        🛒 Your shopping list will be formatted to import directly into your chosen store's online cart.
      </InfoBox>
    </>
  );
}

// --- SCREEN 5: Dietary ---
function S5({ d, set }) {
  const opts = [
    { id: "vegetarian", icon: "🥦", label: "Vegetarian" },
    { id: "vegan", icon: "🌱", label: "Vegan" },
    { id: "glutenfree", icon: "🌾", label: "Gluten Free" },
    { id: "dairyfree", icon: "🥛", label: "Dairy Free" },
    { id: "nutallergy", icon: "🥜", label: "Nut Allergy" },
    { id: "diabetic", icon: "💊", label: "Diabetic" },
    { id: "halal", icon: "☪️", label: "Halal" },
    { id: "none", icon: "✅", label: "No restrictions" },
  ];
  const sel = d.dietary ?? ["none"];
  const toggle = id => {
    if (id === "none") { set(p => ({ ...p, dietary: ["none"] })); return; }
    set(p => ({ ...p, dietary: sel.includes(id) ? sel.filter(r => r !== id && r !== "none") : [...sel.filter(r => r !== "none"), id] }));
  };
  return (
    <>
      <ScreenHeading title="Any dietary needs?" sub="Select all that apply across your household." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {opts.map(o => {
          const on = sel.includes(o.id);
          return (
            <button key={o.id} onClick={() => toggle(o.id)} style={{
              background: on ? C.greenLight : C.card,
              border: `2px solid ${on ? C.green : C.border}`,
              borderRadius: 16, padding: "18px 12px", cursor: "pointer", textAlign: "center",
            }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{o.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: on ? C.green : C.text }}>{o.label}</div>
            </button>
          );
        })}
      </div>
      <Card>
        <SectionLabel>Medications or medical notes</SectionLabel>
        <div style={{ background: C.bg, borderRadius: 10, padding: "14px", border: `1.5px solid ${C.border}`, fontSize: 15, color: C.muted }}>
          Tap to add medications or conditions...
        </div>
      </Card>
    </>
  );
}

// --- SCREEN 6: Food Plan Tier ---
function S6({ d, set }) {
  const tiers = [
    { id: "basic", icon: "🟢", label: "Bare Essentials", desc: "Rice, oats, lentils, canned basics. Pure survival, lowest cost.", est: "~$180" },
    { id: "balanced", icon: "🟡", label: "Balanced & Practical", desc: "Variety and palatability. Budget-conscious, nothing fancy.", est: "~$320" },
    { id: "comfortable", icon: "🔵", label: "Comfortable Living", desc: "More variety, better flavour, closer to normal eating.", est: "~$520" },
  ];
  const sel = d.tier ?? "balanced";
  return (
    <>
      <ScreenHeading title="What kind of food plan?" sub="Start with essentials — you can top up with extras later." />
      {tiers.map(t => {
        const on = sel === t.id;
        return (
          <button key={t.id} onClick={() => set(p => ({ ...p, tier: t.id }))} style={{
            width: "100%", background: on ? C.greenLight : C.card,
            border: `2px solid ${on ? C.green : C.border}`,
            borderRadius: 16, padding: "18px", marginBottom: 10, cursor: "pointer", textAlign: "left",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{t.icon}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: on ? C.green : C.text }}>{t.label}</span>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.accent }}>{t.est}</span>
            </div>
            <div style={{ fontSize: 13, color: C.muted, paddingLeft: 30 }}>{t.desc}</div>
          </button>
        );
      })}
      <InfoBox color={C.greenLight} borderColor={C.green} textColor={C.green}>
        💡 Lock in essentials first — we'll suggest flavour top-ups within your remaining budget at the end.
      </InfoBox>
    </>
  );
}

// --- SCREEN 7: Plan Duration ---
function S7({ d, set }) {
  const durations = [
    { id: "3d", label: "3 Days", sub: "Govt minimum" },
    { id: "1w", label: "1 Week", sub: "Short event" },
    { id: "2w", label: "2 Weeks", sub: "Moderate" },
    { id: "4w", label: "4 Weeks", sub: "Recommended" },
    { id: "8w", label: "8 Weeks", sub: "⭐ Your region" },
    { id: "12w", label: "12 Weeks", sub: "Major event" },
  ];
  const sel = d.duration ?? "8w";
  return (
    <>
      <ScreenHeading title="How long to plan for?" sub="Based on your risks, we recommend extended isolation planning." />
      <InfoBox>
        ⚠️ <strong>Your situation:</strong> Canterbury rural + earthquake + supply cut-off. Roads could be blocked for weeks. We suggest <strong>8 weeks minimum.</strong>
      </InfoBox>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {durations.map(dur => {
          const on = sel === dur.id;
          return (
            <button key={dur.id} onClick={() => set(p => ({ ...p, duration: dur.id }))} style={{
              background: on ? C.green : C.card,
              border: `2px solid ${on ? C.green : C.border}`,
              borderRadius: 14, padding: "16px 8px", cursor: "pointer", textAlign: "center",
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: on ? "#fff" : C.text }}>{dur.label}</div>
              <div style={{ fontSize: 11, color: on ? "rgba(255,255,255,0.75)" : C.muted, marginTop: 3 }}>{dur.sub}</div>
            </button>
          );
        })}
      </div>
      <Card>
        <SectionLabel>Estimated total cost</SectionLabel>
        <div style={{ fontSize: 32, fontWeight: 800, color: C.green, fontFamily: "Georgia, serif" }}>~$1,240</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>2 adults · 8 weeks · balanced plan · staged weekly orders</div>
      </Card>
      <button onClick={() => alert("Plan generation coming soon!")} style={{
        width: "100%", background: C.green, color: "#fff", border: "none",
        borderRadius: 16, padding: "18px", fontSize: 17, fontWeight: 700, cursor: "pointer",
        fontFamily: "Georgia, serif",
      }}>
        Build My Plan →
      </button>
    </>
  );
}

const SCREEN_COMPONENTS = [S1, S2, S3, S4, S5, S6, S7];

export default function App() {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState({ adults: 2, children: 0, dogs: 0 });
  const Screen = SCREEN_COMPONENTS[current - 1];
  const isLast = current === SCREENS.length;

  return (
    <div style={{ minHeight: "100vh", background: "#E5E0D5" }}>
      <div style={{
        maxWidth: 480, margin: "0 auto", minHeight: "100vh",
        background: C.bg, display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{ background: C.green, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <span style={{ fontSize: 26 }}>🌿</span>
          <div>
            <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>HowSure</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Emergency Preparedness Planner</div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ background: C.bg, padding: "14px 20px 10px", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: C.muted }}>Step {current} of {SCREENS.length}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{SCREENS[current - 1].title}</span>
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {SCREENS.map((s, i) => (
              <button key={s.id} onClick={() => setCurrent(s.id)} style={{
                flex: 1, height: 6, borderRadius: 99, border: "none", cursor: "pointer", padding: 0,
                background: i < current ? C.green : i === current - 1 ? C.accent : C.border,
              }} />
            ))}
          </div>
          <div style={{ display: "flex" }}>
            {SCREENS.map((s, i) => (
              <button key={s.id} onClick={() => setCurrent(s.id)} style={{
                flex: 1, border: "none", background: "none", cursor: "pointer",
                fontSize: 18, opacity: i === current - 1 ? 1 : 0.3, padding: "2px 0",
              }}>{s.icon}</button>
            ))}
          </div>
        </div>

        {/* Scrollable screen content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 24px", WebkitOverflowScrolling: "touch" }}>
          <Screen d={data} set={setData} />
        </div>

        {/* Bottom nav */}
        <div style={{
          padding: "14px 20px 24px", borderTop: `1px solid ${C.border}`,
          background: C.bg, display: "flex", gap: 10, flexShrink: 0,
        }}>
          {current > 1 && (
            <button onClick={() => setCurrent(c => c - 1)} style={{
              flex: 1, background: C.card, border: `1.5px solid ${C.border}`,
              borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 600,
              cursor: "pointer", color: C.text, fontFamily: "Georgia, serif",
            }}>← Back</button>
          )}
          {!isLast && (
            <button onClick={() => setCurrent(c => c + 1)} style={{
              flex: 2, background: C.green, border: "none",
              borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700,
              cursor: "pointer", color: "#fff", fontFamily: "Georgia, serif",
            }}>Continue →</button>
          )}
        </div>

      </div>
    </div>
  );
}
