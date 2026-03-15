import React, { useState } from "react";
import "./App.css";

const C = {
  bg: "#F5F2EC",
  card: "#FFFFFF",
  green: "#2D5A3D",
  greenLight: "#EAF2EC",
  greenDark: "#1e3d29",
  accent: "#E8845C",
  text: "#1A1A1A",
  muted: "#6B7280",
  border: "#E2DDD5",
  warn: "#FEF3C7",
  warnBorder: "#F59E0B",
  warnText: "#92400E",
  danger: "#FEE2E2",
  dangerBorder: "#EF4444",
  dangerText: "#991B1B",
};

const ADULT_AGES = ["18-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75+"];
const CHILD_AGES = ["Under 6 months", "6-12 months", "12-24 months", "2-4 years", "5-12 years", "13-17 years"];
const INFANT_AGES = ["Under 6 months", "6-12 months", "12-24 months"];

const PROGRESS_SCREENS = [
  { id: 1, title: "Household" },
  { id: 2, title: "Location" },
  { id: 3, title: "Risks" },
  { id: 4, title: "Stores" },
  { id: 5, title: "Dietary" },
  { id: 6, title: "Food Plan" },
  { id: 7, title: "Duration" },
];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function Card({ children, style = {} }) {
  return (
    <div style={{ background: C.card, borderRadius: 16, border: "1px solid " + C.border, padding: 20, marginBottom: 14, ...style }}>
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

function InfoBox({ children, color, borderColor, textColor }) {
  return (
    <div style={{ background: color || C.warn, border: "1px solid " + (borderColor || C.warnBorder), borderRadius: 12, padding: "12px 14px", marginBottom: 14, fontSize: 13, color: textColor || C.warnText, lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

function ScreenHeading({ title, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "0 0 8px", fontFamily: "Georgia, serif" }}>{title}</h2>
      {sub && <p style={{ fontSize: 15, color: C.muted, margin: 0, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  );
}

function SelectPill({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
      {options.map(opt => {
        const on = value === opt;
        return (
          <button key={opt} onClick={() => onChange(opt)} style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.text, border: "1.5px solid " + (on ? C.green : C.border), borderRadius: 99, padding: "7px 14px", fontSize: 13, fontWeight: on ? 700 : 400, cursor: "pointer" }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function PersonCard({ label, onRemove, children }) {
  return (
    <div style={{ background: C.card, borderRadius: 14, border: "1.5px solid " + C.border, marginBottom: 10, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: C.greenLight, borderBottom: "1px solid " + C.border }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>{label}</span>
        <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: C.muted, padding: "0 4px" }}>Remove</button>
      </div>
      <div style={{ padding: "14px 16px" }}>{children}</div>
    </div>
  );
}

function InfantExtra({ person, onChange }) {
  if (!INFANT_AGES.includes(person.age)) return null;
  return (
    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid " + C.border }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 }}>Feeding method</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Breastfed", "Formula fed", "Mixed feeding"].map(opt => {
          const on = person.feeding === opt;
          return (
            <button key={opt} onClick={() => onChange({ ...person, feeding: opt })} style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.text, border: "1.5px solid " + (on ? C.green : C.border), borderRadius: 99, padding: "7px 14px", fontSize: 13, fontWeight: on ? 700 : 400, cursor: "pointer" }}>
              {opt}
            </button>
          );
        })}
      </div>
      <InfoBox>
        Formula will be included as an emergency backup regardless of feeding method. Guidelines recommend this for all infants in case the feeding parent is unable to feed.
      </InfoBox>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 }}>Auto-added to your plan:</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["Formula (backup)", "Bottles x4", "Sterilisation kit", "Nappies", "Baby wipes", "Pamol", "Thermometer"].map(item => (
          <div key={item} style={{ background: C.greenLight, color: C.green, borderRadius: 99, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function CounterRow({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid " + C.border }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={() => onChange(Math.max(0, value - 1))} style={{ width: 40, height: 40, borderRadius: "50%", border: "1.5px solid " + C.border, background: C.bg, fontSize: 22, cursor: "pointer", color: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>-</button>
        <span style={{ fontSize: 20, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{value}</span>
        <button onClick={() => onChange(value + 1)} style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: C.green, fontSize: 22, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>+</button>
      </div>
    </div>
  );
}

function YesNo({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {[["Yes", true], ["No", false]].map(([label, val]) => {
        const on = value === val;
        return (
          <button key={label} onClick={() => onChange(val)} style={{ flex: 1, background: on ? C.green : C.bg, color: on ? "#fff" : C.text, border: "1.5px solid " + (on ? C.green : C.border), borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

function PrimaryBtn({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{ width: "100%", background: C.green, color: "#fff", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia, serif", ...style }}>
      {children}
    </button>
  );
}

function SecondaryBtn({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{ width: "100%", background: C.card, color: C.text, border: "1.5px solid " + C.border, borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "Georgia, serif", ...style }}>
      {children}
    </button>
  );
}

// ─── ONBOARDING SCREENS ──────────────────────────────────────────────────────

function S1({ d, set }) {
  const adults = d.adults || [];
  const children = d.children || [];
  const pets = d.pets || { dogs: 0, cats: 0 };
  const guests = d.guests || { hasGuests: null, max: 0 };

  const addAdult = () => set(p => ({ ...p, adults: [...(p.adults || []), { age: "" }] }));
  const removeAdult = i => set(p => ({ ...p, adults: p.adults.filter((_, idx) => idx !== i) }));
  const updateAdult = (i, val) => set(p => ({ ...p, adults: p.adults.map((a, idx) => idx === i ? { ...a, age: val } : a) }));
  const addChild = () => set(p => ({ ...p, children: [...(p.children || []), { age: "" }] }));
  const removeChild = i => set(p => ({ ...p, children: p.children.filter((_, idx) => idx !== i) }));
  const updateChild = (i, val) => set(p => ({ ...p, children: p.children.map((c, idx) => idx === i ? { ...c, age: val } : c) }));
  const updateChildFull = (i, val) => set(p => ({ ...p, children: p.children.map((c, idx) => idx === i ? val : c) }));
  const updatePets = (k, v) => set(p => ({ ...p, pets: { ...(p.pets || {}), [k]: Math.max(0, v) } }));
  const updateGuests = (k, v) => set(p => ({ ...p, guests: { ...(p.guests || {}), [k]: v } }));

  return (
    <>
      <ScreenHeading title="Who are we planning for?" sub="This sets your food, water and supply amounts." />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <SectionLabel>Adults</SectionLabel>
          <button onClick={addAdult} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 99, padding: "6px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Add Adult</button>
        </div>
        {adults.length === 0 && <div style={{ fontSize: 14, color: C.muted, textAlign: "center", padding: "10px 0" }}>Tap + Add Adult to begin</div>}
        {adults.map((a, i) => (
          <PersonCard key={i} label={"Adult " + (i + 1)} onRemove={() => removeAdult(i)}>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>Age bracket</div>
            <SelectPill options={ADULT_AGES} value={a.age} onChange={v => updateAdult(i, v)} />
          </PersonCard>
        ))}
      </Card>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <SectionLabel>Children</SectionLabel>
          <button onClick={addChild} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 99, padding: "6px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Add Child</button>
        </div>
        {children.length === 0 && <div style={{ fontSize: 14, color: C.muted, textAlign: "center", padding: "10px 0" }}>Tap + Add Child to begin</div>}
        {children.map((c, i) => (
          <PersonCard key={i} label={"Child " + (i + 1)} onRemove={() => removeChild(i)}>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>Age bracket</div>
            <SelectPill options={CHILD_AGES} value={c.age} onChange={v => updateChild(i, v)} />
            <InfantExtra person={c} onChange={v => updateChildFull(i, v)} />
          </PersonCard>
        ))}
      </Card>
      <Card>
        <SectionLabel>Pets</SectionLabel>
        <CounterRow label="Dogs" value={pets.dogs || 0} onChange={v => updatePets("dogs", v)} />
        <CounterRow label="Cats" value={pets.cats || 0} onChange={v => updatePets("cats", v)} />
        <div style={{ fontSize: 12, color: C.muted, marginTop: 10 }}>Other pets can be added after setup.</div>
      </Card>
      <Card>
        <SectionLabel>Short-stay residents</SectionLabel>
        <div style={{ fontSize: 14, color: C.text, marginBottom: 12 }}>Does your property have temporary guests? <span style={{ color: C.muted }}>(e.g. Airbnb, holiday rental)</span></div>
        <YesNo value={guests.hasGuests} onChange={v => updateGuests("hasGuests", v)} />
        {guests.hasGuests === true && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>Are you responsible for their emergency welfare?</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {["Yes - responsible", "No - just a buffer"].map(opt => {
                const on = guests.responsible === opt;
                return <button key={opt} onClick={() => updateGuests("responsible", opt)} style={{ flex: 1, background: on ? C.greenLight : C.bg, color: on ? C.green : C.text, border: "1.5px solid " + (on ? C.green : C.border), borderRadius: 12, padding: "10px 8px", fontSize: 13, fontWeight: on ? 700 : 400, cursor: "pointer" }}>{opt}</button>;
              })}
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>Maximum guests at any one time</div>
            <CounterRow label="Guests" value={guests.max || 0} onChange={v => updateGuests("max", v)} />
          </div>
        )}
      </Card>
      <Card>
        <SectionLabel>Specialist needs</SectionLabel>
        <div style={{ fontSize: 14, color: C.text, marginBottom: 12 }}>Does anyone in your household have specialist needs? <span style={{ color: C.muted }}>(e.g. mobility, visual, hearing, medical equipment, cognitive)</span></div>
        <YesNo value={d.specialistNeeds === undefined ? null : d.specialistNeeds} onChange={v => set(p => ({ ...p, specialistNeeds: v }))} />
      </Card>
    </>
  );
}

function S1b() {
  return (
    <>
      <ScreenHeading title="Specialist needs planning" sub="We're building this out to make sure no one is left behind." />
      <Card style={{ textAlign: "center", padding: "32px 20px" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.green, marginBottom: 12, fontFamily: "Georgia, serif" }}>Coming soon</div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>Specialist needs planning is on its way. This will include tailored supply lists, accessibility considerations, medical equipment power requirements, evacuation weight limits, and more.</div>
        <div style={{ background: C.greenLight, borderRadius: 12, padding: "14px 16px", fontSize: 13, color: C.green, lineHeight: 1.6, textAlign: "left" }}>We have noted that your household has specialist needs. This will be factored into your plan as we develop this feature.</div>
      </Card>
      <InfoBox>Guidelines suggest discussing emergency planning with your GP or specialist if any household member has significant medical dependencies or equipment needs.</InfoBox>
    </>
  );
}

function S2() {
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
            <div style={{ background: C.green, color: "#fff", borderRadius: 10, padding: "10px 24px", fontSize: 15, fontWeight: 700 }}>Tap to place your pin</div>
          </div>
          <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(255,255,255,0.93)", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: "#1a6aaa", fontWeight: 700 }}>River 2.1km</div>
          <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(255,255,255,0.93)", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: C.green, fontWeight: 700 }}>180m elevation</div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg, borderRadius: 12, padding: "14px", border: "1.5px solid " + C.border, marginBottom: 10 }}>
            <span style={{ fontSize: 15, color: C.muted }}>Search your address...</span>
          </div>
          <div style={{ background: C.greenLight, borderRadius: 10, padding: "13px 14px", fontSize: 15, color: C.green, fontWeight: 600, textAlign: "center" }}>Use my current location</div>
        </div>
      </Card>
      <Card>
        <SectionLabel>Auto-detected from your pin</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Canterbury Region", "Rural", "180m elevation", "River 2.1km"].map(t => (
            <div key={t} style={{ background: C.greenLight, color: C.green, borderRadius: 99, padding: "6px 14px", fontSize: 13, fontWeight: 600 }}>{t}</div>
          ))}
        </div>
      </Card>
    </>
  );
}

function S3({ d, set }) {
  const risks = [
    { id: "earthquake", label: "Earthquake" },
    { id: "tsunami", label: "Tsunami" },
    { id: "flood", label: "Flooding" },
    { id: "volcanic", label: "Volcanic Activity" },
    { id: "landslip", label: "Landslip" },
    { id: "storm", label: "Severe Storm" },
    { id: "wildfire", label: "Wildfire" },
    { id: "extremeweather", label: "Extreme Weather" },
    { id: "isolation", label: "Supply Cut-off" },
  ];
  const sel = d.risks || ["earthquake", "isolation"];
  const toggle = id => set(p => ({ ...p, risks: sel.includes(id) ? sel.filter(r => r !== id) : [...sel, id] }));
  return (
    <>
      <ScreenHeading title="What risks apply to you?" sub="Pre-filled from your location. Adjust to match your situation." />
      <InfoBox>Canterbury region detected — earthquake and supply cut-off risk auto-selected. Review and adjust as needed.</InfoBox>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {risks.map(r => {
          const on = sel.includes(r.id);
          return (
            <button key={r.id} onClick={() => toggle(r.id)} style={{ background: on ? C.greenLight : C.card, border: "2px solid " + (on ? C.green : C.border), borderRadius: 16, padding: "18px 14px", cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: on ? C.green : C.text }}>{r.label}</div>
              {on && <div style={{ fontSize: 11, color: C.green, fontWeight: 700, marginTop: 4 }}>Selected</div>}
            </button>
          );
        })}
      </div>
    </>
  );
}

function S4({ d, set }) {
  const stores = [
    { id: "woolworths", name: "Woolworths NZ", dist: "3.2km", tag: "Closest to you" },
    { id: "newworld", name: "New World", dist: "5.8km", tag: "Online delivery available" },
    { id: "paknsave", name: "Pak'nSave", dist: "8.1km", tag: "Best value" },
  ];
  const sel = d.store || "woolworths";
  return (
    <>
      <ScreenHeading title="Your nearest supermarkets" sub="Found from your location. Pick where you prefer to shop." />
      {stores.map(s => {
        const on = sel === s.id;
        return (
          <button key={s.id} onClick={() => set(p => ({ ...p, store: s.id }))} style={{ width: "100%", background: on ? C.greenLight : C.card, border: "2px solid " + (on ? C.green : C.border), borderRadius: 16, padding: "18px", marginBottom: 10, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: on ? C.green : C.text }}>{s.name}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{s.dist} — {s.tag}</div>
            </div>
            {on && <div style={{ fontSize: 14, fontWeight: 700, color: C.green }}>Selected</div>}
          </button>
        );
      })}
      <InfoBox color={C.greenLight} borderColor={C.green} textColor={C.green}>
        Your shopping list will be formatted to import directly into your chosen store's online cart.
      </InfoBox>
    </>
  );
}

function S5({ d, set }) {
  const opts = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "glutenfree", label: "Gluten Free" },
    { id: "dairyfree", label: "Dairy Free" },
    { id: "nutallergy", label: "Nut Allergy" },
    { id: "diabetic", label: "Diabetic" },
    { id: "halal", label: "Halal" },
    { id: "none", label: "No restrictions" },
  ];
  const sel = d.dietary || ["none"];
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
            <button key={o.id} onClick={() => toggle(o.id)} style={{ background: on ? C.greenLight : C.card, border: "2px solid " + (on ? C.green : C.border), borderRadius: 16, padding: "18px 14px", cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: on ? C.green : C.text }}>{o.label}</div>
            </button>
          );
        })}
      </div>
      <Card>
        <SectionLabel>Medications or medical notes</SectionLabel>
        <div style={{ background: C.bg, borderRadius: 10, padding: "14px", border: "1.5px solid " + C.border, fontSize: 15, color: C.muted }}>Tap to add medications or conditions...</div>
      </Card>
    </>
  );
}

function S6({ d, set }) {
  const tiers = [
    { id: "basic", label: "Bare Essentials", desc: "Rice, oats, lentils, canned basics. Pure survival, lowest cost.", est: "~$180" },
    { id: "balanced", label: "Balanced and Practical", desc: "Variety and palatability. Budget-conscious, nothing fancy.", est: "~$320" },
    { id: "comfortable", label: "Comfortable Living", desc: "More variety, better flavour, closer to normal eating.", est: "~$520" },
  ];
  const sel = d.tier || "balanced";
  return (
    <>
      <ScreenHeading title="What kind of food plan?" sub="Start with essentials. You can top up with extras later." />
      {tiers.map(t => {
        const on = sel === t.id;
        return (
          <button key={t.id} onClick={() => set(p => ({ ...p, tier: t.id }))} style={{ width: "100%", background: on ? C.greenLight : C.card, border: "2px solid " + (on ? C.green : C.border), borderRadius: 16, padding: "18px", marginBottom: 10, cursor: "pointer", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: on ? C.green : C.text }}>{t.label}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.accent }}>{t.est}</span>
            </div>
            <div style={{ fontSize: 13, color: C.muted }}>{t.desc}</div>
          </button>
        );
      })}
      <InfoBox color={C.greenLight} borderColor={C.green} textColor={C.green}>
        Lock in essentials first. Guidelines suggest topping up with flavour and variety once your core supplies are secured.
      </InfoBox>
    </>
  );
}

function S7({ d, set }) {
  const durations = [
    { id: "3d", label: "3 Days", sub: "Govt minimum" },
    { id: "1w", label: "1 Week", sub: "Short event" },
    { id: "2w", label: "2 Weeks", sub: "Moderate" },
    { id: "4w", label: "4 Weeks", sub: "Recommended" },
    { id: "8w", label: "8 Weeks", sub: "Your region" },
    { id: "12w", label: "12 Weeks", sub: "Major event" },
  ];
  const sel = d.duration || "8w";
  return (
    <>
      <ScreenHeading title="How long to plan for?" sub="Based on your risks, guidelines suggest extended isolation planning." />
      <InfoBox>
        Your situation: Canterbury rural, earthquake and supply cut-off risk. Roads could be blocked for weeks. Guidelines suggest a minimum of 8 weeks for your region.
      </InfoBox>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {durations.map(dur => {
          const on = sel === dur.id;
          return (
            <button key={dur.id} onClick={() => set(p => ({ ...p, duration: dur.id }))} style={{ background: on ? C.green : C.card, border: "2px solid " + (on ? C.green : C.border), borderRadius: 14, padding: "16px 8px", cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: on ? "#fff" : C.text }}>{dur.label}</div>
              <div style={{ fontSize: 11, color: on ? "rgba(255,255,255,0.75)" : C.muted, marginTop: 3 }}>{dur.sub}</div>
            </button>
          );
        })}
      </div>
      <Card>
        <SectionLabel>Estimated total cost</SectionLabel>
        <div style={{ fontSize: 32, fontWeight: 800, color: C.green, fontFamily: "Georgia, serif" }}>~$1,240</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>2 adults — 8 weeks — balanced plan — staged weekly orders</div>
      </Card>
    </>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

function Dashboard({ data, onNavigate }) {
  const adults = (data.adults || []).length;
  const children = (data.children || []).length;
  const pets = data.pets || {};
  const duration = data.duration || "8w";
  const durationLabels = { "3d": "3 Days", "1w": "1 Week", "2w": "2 Weeks", "4w": "4 Weeks", "8w": "8 Weeks", "12w": "12 Weeks" };

  const sections = [
    {
      id: "homesafe",
      title: "Make Your Home Safe",
      desc: "Utility locations, shutoff procedures and evacuation point",
      status: data.homeSafeComplete ? "complete" : "action",
      action: data.homeSafeComplete ? "Review" : "Start now",
    },
    {
      id: "food",
      title: "Food and Supply Plan",
      desc: "Shopping lists, storage and rotation schedule",
      status: "soon",
      action: "Coming soon",
    },
    {
      id: "water",
      title: "Water Planning",
      desc: "Storage, purification and daily requirements",
      status: "soon",
      action: "Coming soon",
    },
    {
      id: "medical",
      title: "Medical Kit",
      desc: "Household-specific first aid and medication supplies",
      status: "soon",
      action: "Coming soon",
    },
    {
      id: "communications",
      title: "Communications Plan",
      desc: "Emergency contacts, radio stations and family check-in",
      status: "soon",
      action: "Coming soon",
    },
    {
      id: "plan",
      title: "My Emergency Plan",
      desc: "Download your complete printed plan and quick reference card",
      status: "soon",
      action: "Coming soon",
    },
  ];

  const statusStyles = {
    action: { bg: C.warn, border: C.warnBorder, text: C.warnText, dot: C.warnText },
    complete: { bg: C.greenLight, border: C.green, text: C.green, dot: C.green },
    soon: { bg: C.bg, border: C.border, text: C.muted, dot: C.border },
  };

  const completedCount = sections.filter(s => s.status === "complete").length;
  const actionCount = sections.filter(s => s.status === "action").length;

  return (
    <div style={{ padding: "20px 20px 100px" }}>

      {/* Household summary */}
      <div style={{ background: C.green, borderRadius: 16, padding: "20px", marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Your Household</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", marginBottom: 12 }}>
          {adults > 0 ? adults + (adults === 1 ? " Adult" : " Adults") : ""}
          {children > 0 ? (adults > 0 ? ", " : "") + children + (children === 1 ? " Child" : " Children") : ""}
          {(pets.dogs || 0) + (pets.cats || 0) > 0 ? ", " + ((pets.dogs || 0) + (pets.cats || 0)) + " Pet" + ((pets.dogs || 0) + (pets.cats || 0) > 1 ? "s" : "") : ""}
          {adults === 0 && children === 0 ? "No household set up yet" : ""}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 99, padding: "5px 12px", fontSize: 12, color: "#fff", fontWeight: 600 }}>
            Plan: {durationLabels[duration] || duration}
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 99, padding: "5px 12px", fontSize: 12, color: "#fff", fontWeight: 600 }}>
            {data.store ? data.store.charAt(0).toUpperCase() + data.store.slice(1) : "No store selected"}
          </div>
          {(data.risks || []).length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 99, padding: "5px 12px", fontSize: 12, color: "#fff", fontWeight: 600 }}>
              {(data.risks || []).length} risks identified
            </div>
          )}
        </div>
      </div>

      {/* Progress summary */}
      <Card>
        <SectionLabel>Plan completion</SectionLabel>
        <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ flex: 1, height: 6, borderRadius: 99, background: s.status === "complete" ? C.green : s.status === "action" ? C.accent : C.border }} />
          ))}
        </div>
        <div style={{ fontSize: 13, color: C.muted }}>
          {completedCount} of {sections.length} sections complete
          {actionCount > 0 ? " — " + actionCount + " section" + (actionCount > 1 ? "s" : "") + " need" + (actionCount === 1 ? "s" : "") + " attention" : ""}
        </div>
      </Card>

      {/* Official guidance note */}
      <InfoBox>
        For guidance on WHEN to take emergency action, always follow NZ Civil Defence and Get Ready NZ instructions for your specific emergency type. HowSure helps you know HOW and WHERE to act on your own property.
      </InfoBox>

      {/* Section tiles */}
      <SectionLabel>Your emergency plan sections</SectionLabel>
      {sections.map(s => {
        const st = statusStyles[s.status];
        return (
          <button key={s.id} onClick={() => s.status !== "soon" && onNavigate(s.id)} style={{ width: "100%", background: st.bg, border: "1.5px solid " + st.border, borderRadius: 16, padding: "16px 18px", marginBottom: 10, cursor: s.status === "soon" ? "default" : "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: s.status === "soon" ? C.muted : C.text, marginBottom: 3 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.4 }}>{s.desc}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: st.text, whiteSpace: "nowrap" }}>{s.action}</div>
          </button>
        );
      })}

      {/* Edit household */}
      <div style={{ marginTop: 8 }}>
        <SecondaryBtn onClick={() => onNavigate("onboarding")}>Edit household profile</SecondaryBtn>
      </div>
    </div>
  );
}

// ─── HOME SAFE INTERVIEW ─────────────────────────────────────────────────────

const HS_STEPS = [
  { id: "hs1", title: "Gas Supply" },
  { id: "hs2", title: "Electricity" },
  { id: "hs3", title: "Water Supply" },
  { id: "hs4", title: "Other Utilities" },
  { id: "hs5", title: "Before You Act" },
  { id: "hs6", title: "Rendezvous Point" },
  { id: "hs7", title: "Your Quick Card" },
];

function HSProgress({ current }) {
  const idx = HS_STEPS.findIndex(s => s.id === current);
  return (
    <div style={{ background: C.bg, padding: "14px 20px 10px", flexShrink: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: C.muted }}>Step {idx + 1} of {HS_STEPS.length}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{HS_STEPS[idx].title}</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {HS_STEPS.map((s, i) => (
          <div key={s.id} style={{ flex: 1, height: 6, borderRadius: 99, background: i < idx ? C.green : i === idx ? C.accent : C.border }} />
        ))}
      </div>
    </div>
  );
}

function TextInput({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      style={{ width: "100%", background: C.bg, border: "1.5px solid " + C.border, borderRadius: 12, padding: "14px", fontSize: 15, color: C.text, fontFamily: "Georgia, serif", boxSizing: "border-box", outline: "none" }}
    />
  );
}

function HS1({ d, set }) {
  const hs = d.homeSafe || {};
  const u = (k, v) => set(p => ({ ...p, homeSafe: { ...(p.homeSafe || {}), [k]: v } }));
  return (
    <>
      <ScreenHeading title="Gas supply" sub="Only isolate if you smell gas, see visible damage, or Civil Defence advises you to." />
      <InfoBox color={C.greenLight} borderColor={C.green} textColor={C.green}>
        NZ Civil Defence advises: do not turn off mains gas unless explicitly told to by authorities or you can smell gas. A licensed professional is required to turn it back on and this may take weeks.
      </InfoBox>
      <Card>
        <SectionLabel>Do you have gas connected?</SectionLabel>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["No gas", "LPG bottles", "Mains gas"].map(opt => {
            const on = hs.gasType === opt;
            return <button key={opt} onClick={() => u("gasType", opt)} style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.text, border: "1.5px solid " + (on ? C.green : C.border), borderRadius: 99, padding: "10px 18px", fontSize: 14, fontWeight: on ? 700 : 400, cursor: "pointer" }}>{opt}</button>;
          })}
        </div>
      </Card>
      {hs.gasType && hs.gasType !== "No gas" && (
        <>
          <Card>
            <SectionLabel>Where is your gas shutoff located?</SectionLabel>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>Describe the exact location so anyone in your household can find it</div>
            <TextInput placeholder='e.g. "South wall outside garage, next to meter"' value={hs.gasLocation} onChange={v => u("gasLocation", v)} />
          </Card>
          <Card>
            <SectionLabel>What does the shutoff look like?</SectionLabel>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Yellow handle", "Red wheel", "Lever", "Not sure"].map(opt => {
                const on = hs.gasShutoffType === opt;
                return <button key={opt} onClick={() => u("gasShutoffType", opt)} style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.text, border: "1.5px solid " + (on ? C.green : C.border), borderRadius: 99, padding: "10px 18px", fontSize: 14, fontWeight: on ? 700 : 400, cursor: "pointer" }}>{opt}</button>;
              })}
            </div>
          </Card>
          <Card>
            <SectionLabel>Action to isolate</SectionLabel>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>Turn the {hs.gasShutoffType ? hs.gasShutoffType.toLowerCase() : "shutoff"} to the OFF position. Do not attempt to turn mains gas back on yourself — contact your gas provider.</div>
          </Card>
        </>
      )}
    </>
  );
}

function HS2({ d, set }) {
  const hs = d.homeSafe || {};
  const u = (k, v) => set(p => ({ ...p, homeSafe: { ...(p.homeSafe || {}), [k]: v } }));
  return (
    <>
      <ScreenHeading title="Electricity" sub="Isolate if your home has water damage, structural damage, or if Civil Defence advises you to." />
      <Card>
        <SectionLabel>Where is your main switchboard located?</SectionLabel>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>Describe the exact location</div>
        <TextInput placeholder='e.g. "Cabinet next to internal garage door"' value={hs.switchboardLocation} onChange={v => u("switchboardLocation", v)} />
      </Card>
      <Card>
        <SectionLabel>Do you have solar panels?</SectionLabel>
        <YesNo value={hs.hasSolar === undefined ? null : hs.hasSolar} onChange={v => u("hasSolar", v)} />
      </Card>
      {hs.hasSolar === true && (
        <>
          <Card>
            <SectionLabel>Where is your solar supply main switch?</SectionLabel>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>Usually at or near your main switchboard</div>
            <TextInput placeholder='e.g. "On the switchboard, labelled Solar Supply Main Switch"' value={hs.solarMainSwitch} onChange={v => u("solarMainSwitch", v)} />
          </Card>
          <Card>
            <SectionLabel>Where is your inverter located?</SectionLabel>
            <TextInput placeholder='e.g. "Garage wall, south side"' value={hs.inverterLocation} onChange={v => u("inverterLocation", v)} />
          </Card>
          <Card>
            <SectionLabel>Do you have battery storage?</SectionLabel>
            <YesNo value={hs.hasBattery === undefined ? null : hs.hasBattery} onChange={v => u("hasBattery", v)} />
            {hs.hasBattery === true && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>Where is your battery isolator?</div>
                <TextInput placeholder='e.g. "Next to inverter in garage"' value={hs.batteryLocation} onChange={v => u("batteryLocation", v)} />
              </div>
            )}
          </Card>
          <InfoBox>
            Solar isolation order: (1) Solar supply main switch at switchboard. (2) AC isolator at inverter. (3) DC isolator at inverter. Do not go on the roof. Panels remain live in daylight even when the system is switched off.
          </InfoBox>
        </>
      )}
    </>
  );
}

function HS3({ d, set }) {
  const hs = d.homeSafe || {};
  const u = (k, v) => set(p => ({ ...p, homeSafe: { ...(p.homeSafe || {}), [k]: v } }));
  return (
    <>
      <ScreenHeading title="Water supply" sub="Isolate only if pipes are visibly damaged or Civil Defence advises you to." />
      <InfoBox color={C.greenLight} borderColor={C.green} textColor={C.green}>
        Before isolating: fill your bathtub with fresh water if it is safe to do so. This provides an emergency supply while mains water is off.
      </InfoBox>
      <Card>
        <SectionLabel>What is your water supply?</SectionLabel>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["Town supply", "Tank water", "Both"].map(opt => {
            const on = hs.waterSupply === opt;
            return <button key={opt} onClick={() => u("waterSupply", opt)} style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.text, border: "1.5px solid " + (on ? C.green : C.border), borderRadius: 99, padding: "10px 18px", fontSize: 14, fontWeight: on ? 700 : 400, cursor: "pointer" }}>{opt}</button>;
          })}
        </div>
      </Card>
      {(hs.waterSupply === "Town supply" || hs.waterSupply === "Both") && (
        <Card>
          <SectionLabel>Where is your Toby valve?</SectionLabel>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>The mains water isolation point for your property</div>
          <TextInput placeholder='e.g. "Green box set into ground, next to driveway at road"' value={hs.tobyLocation} onChange={v => u("tobyLocation", v)} />
          <div style={{ fontSize: 13, color: C.muted, marginTop: 10 }}>Action: Turn the Toby valve clockwise to OFF using the Toby key.</div>
        </Card>
      )}
      {(hs.waterSupply === "Tank water" || hs.waterSupply === "Both") && (
        <Card>
          <SectionLabel>Where is your tank inlet valve?</SectionLabel>
          <TextInput placeholder='e.g. "Side of tank, north end of property"' value={hs.tankInletLocation} onChange={v => u("tankInletLocation", v)} />
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>Is your water pump electrically powered?</div>
            <YesNo value={hs.pumpElectric === undefined ? null : hs.pumpElectric} onChange={v => u("pumpElectric", v)} />
            {hs.pumpElectric === true && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>Where is the pump isolator?</div>
                <TextInput placeholder='e.g. "Pump shed, east side of property"' value={hs.pumpIsolatorLocation} onChange={v => u("pumpIsolatorLocation", v)} />
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  );
}

function HS4({ d, set }) {
  const hs = d.homeSafe || {};
  const u = (k, v) => set(p => ({ ...p, homeSafe: { ...(p.homeSafe || {}), [k]: v } }));
  const others = [
    { id: "heatpump", label: "Heat pump / air conditioning" },
    { id: "fuelstorage", label: "Diesel or fuel storage" },
    { id: "septic", label: "Septic / wastewater system" },
    { id: "bore", label: "Bore water" },
    { id: "rainwater", label: "Rainwater collection" },
    { id: "electricgate", label: "Electric gate or garage door" },
    { id: "ups", label: "UPS or battery backup system" },
    { id: "none", label: "None of these apply" },
  ];
  const sel = hs.otherUtilities || [];
  const toggle = id => {
    if (id === "none") { u("otherUtilities", ["none"]); return; }
    const updated = sel.includes(id) ? sel.filter(r => r !== id && r !== "none") : [...sel.filter(r => r !== "none"), id];
    u("otherUtilities", updated);
  };
  return (
    <>
      <ScreenHeading title="Other utilities" sub="Select anything else that applies to your property." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {others.map(o => {
          const on = sel.includes(o.id);
          return (
            <button key={o.id} onClick={() => toggle(o.id)} style={{ background: on ? C.greenLight : C.card, border: "2px solid " + (on ? C.green : C.border), borderRadius: 14, padding: "14px 12px", cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: on ? C.green : C.text }}>{o.label}</div>
              {on && <div style={{ fontSize: 11, color: C.green, fontWeight: 700, marginTop: 4 }}>Selected</div>}
            </button>
          );
        })}
      </div>
      {sel.filter(id => id !== "none").map(id => {
        const item = others.find(o => o.id === id);
        return (
          <Card key={id}>
            <SectionLabel>{item.label} — shutoff location</SectionLabel>
            <TextInput placeholder="Describe the exact location..." value={(hs.otherLocations || {})[id]} onChange={v => u("otherLocations", { ...(hs.otherLocations || {}), [id]: v })} />
          </Card>
        );
      })}
    </>
  );
}

function HS5({ d, set }) {
  const hs = d.homeSafe || {};
  const u = (k, v) => set(p => ({ ...p, homeSafe: { ...(p.homeSafe || {}), [k]: v } }));
  const actions = [
    { id: "bathtub", label: "Fill bathtub with fresh water before isolating mains water" },
    { id: "garage", label: "Manually release garage door before isolating power" },
    { id: "gate", label: "Unlock any electronic gate before isolating power" },
    { id: "vehicles", label: "Move vehicles from flood-prone garage" },
    { id: "devices", label: "Charge all devices at first sign of an incoming emergency" },
    { id: "meds", label: "Move refrigerated medication to a cool bag" },
  ];
  const sel = hs.beforeActions || [];
  const toggle = id => {
    const updated = sel.includes(id) ? sel.filter(r => r !== id) : [...sel, id];
    u("beforeActions", updated);
  };
  return (
    <>
      <ScreenHeading title="Before you isolate" sub="Tick everything that applies to your household. These actions should be done before shutting off utilities." />
      <InfoBox>
        These are steps to take when an emergency is imminent or has just occurred — before you isolate your utilities. Review and select all that apply to your property.
      </InfoBox>
      {actions.map(a => {
        const on = sel.includes(a.id);
        return (
          <button key={a.id} onClick={() => toggle(a.id)} style={{ width: "100%", background: on ? C.greenLight : C.card, border: "2px solid " + (on ? C.green : C.border), borderRadius: 14, padding: "16px", marginBottom: 10, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, border: "2px solid " + (on ? C.green : C.border), background: on ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {on && <div style={{ width: 12, height: 12, background: "#fff", borderRadius: 2 }} />}
            </div>
            <div style={{ fontSize: 14, color: on ? C.green : C.text, fontWeight: on ? 600 : 400, lineHeight: 1.4 }}>{a.label}</div>
          </button>
        );
      })}
    </>
  );
}

function HS6({ d, set }) {
  const hs = d.homeSafe || {};
  const u = (k, v) => set(p => ({ ...p, homeSafe: { ...(p.homeSafe || {}), [k]: v } }));
  return (
    <>
      <ScreenHeading title="Emergency rendezvous point" sub="Where should your household meet if you need to evacuate or cannot communicate?" />
      <InfoBox>
        Choose a location that is safe, easy to find, and known to everyone in your household including children. It should be away from the immediate hazard area.
      </InfoBox>
      <Card>
        <SectionLabel>Where is your household meeting point?</SectionLabel>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>Be as specific as possible so anyone can find it</div>
        <TextInput placeholder='e.g. "Top of walkpath connecting to Kereru Crescent, west side of property"' value={hs.rendezvous} onChange={v => u("rendezvous", v)} />
      </Card>
      <Card>
        <SectionLabel>Secondary meeting point</SectionLabel>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>In case the first location is inaccessible</div>
        <TextInput placeholder='e.g. "Kereru Crescent reserve, corner of main road"' value={hs.rendezvous2} onChange={v => u("rendezvous2", v)} />
      </Card>
    </>
  );
}

function HS7({ d, set, onComplete }) {
  const hs = d.homeSafe || {};

  const renderRow = (label, location, action) => {
    if (!location) return null;
    return (
      <div style={{ paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid " + C.border }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 3 }}>Location: {location}</div>
        {action && <div style={{ fontSize: 13, color: C.muted }}>Action: {action}</div>}
      </div>
    );
  };

  return (
    <>
      <ScreenHeading title="Your quick reference card" sub="Review your home safety information. This will be printed in your emergency plan." />
      <InfoBox>
        Follow NZ Civil Defence instructions for WHEN to act. This card tells you HOW and WHERE to act on your specific property.
      </InfoBox>
      <Card>
        <SectionLabel>Before you act</SectionLabel>
        {(hs.beforeActions || []).length > 0 ? (
          (hs.beforeActions || []).map(id => {
            const actions = {
              bathtub: "Fill bathtub with fresh water",
              garage: "Manually release garage door",
              gate: "Unlock electronic gate",
              vehicles: "Move vehicles from flood-prone garage",
              devices: "Charge all devices",
              meds: "Move refrigerated medication to cool bag",
            };
            return <div key={id} style={{ fontSize: 14, color: C.text, padding: "4px 0" }}>— {actions[id]}</div>;
          })
        ) : (
          <div style={{ fontSize: 14, color: C.muted }}>No actions selected</div>
        )}
      </Card>
      <Card>
        <SectionLabel>Gas</SectionLabel>
        {hs.gasType === "No gas" ? (
          <div style={{ fontSize: 14, color: C.muted }}>No gas connected</div>
        ) : (
          renderRow(hs.gasType || "Gas", hs.gasLocation, "Turn the " + (hs.gasShutoffType || "shutoff").toLowerCase() + " to OFF. Do not turn mains gas back on yourself.")
        )}
      </Card>
      <Card>
        <SectionLabel>Electricity</SectionLabel>
        {renderRow("Main switchboard", hs.switchboardLocation, "Switch main breaker to OFF.")}
        {hs.hasSolar && renderRow("Solar supply main switch", hs.solarMainSwitch, "Turn OFF first, then AC isolator at inverter, then DC isolator. Do not go on roof.")}
        {hs.hasSolar && hs.inverterLocation && renderRow("Inverter", hs.inverterLocation, "Turn AC isolator OFF, then DC isolator OFF.")}
        {hs.hasBattery && renderRow("Battery isolator", hs.batteryLocation, "Turn OFF after inverter is isolated.")}
      </Card>
      <Card>
        <SectionLabel>Water</SectionLabel>
        <div style={{ fontSize: 13, color: C.green, fontWeight: 600, marginBottom: 10 }}>Fill bathtub first if safe to do so</div>
        {renderRow("Toby valve (mains)", hs.tobyLocation, "Turn clockwise to OFF using Toby key.")}
        {renderRow("Tank inlet valve", hs.tankInletLocation, "Turn valve to OFF position.")}
        {hs.pumpElectric && renderRow("Water pump isolator", hs.pumpIsolatorLocation, "Switch to OFF.")}
      </Card>
      {hs.rendezvous && (
        <Card>
          <SectionLabel>Emergency meeting point</SectionLabel>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: hs.rendezvous2 ? 8 : 0 }}>{hs.rendezvous}</div>
          {hs.rendezvous2 && <div style={{ fontSize: 13, color: C.muted }}>Secondary: {hs.rendezvous2}</div>}
        </Card>
      )}
      <div style={{ fontSize: 11, color: C.muted, textAlign: "center", marginBottom: 16, lineHeight: 1.6 }}>
        Source: NZ Civil Defence / Get Ready NZ / WorkSafe NZ guidelines
      </div>
      <PrimaryBtn onClick={() => { set(p => ({ ...p, homeSafeComplete: true })); onComplete(); }}>
        Save and add to my plan
      </PrimaryBtn>
    </>
  );
}

// ─── APP SHELL ───────────────────────────────────────────────────────────────

const ONBOARDING_MAP = { 1: S1, "1b": S1b, 2: S2, 3: S3, 4: S4, 5: S5, 6: S6, 7: S7 };
const HS_MAP = { hs1: HS1, hs2: HS2, hs3: HS3, hs4: HS4, hs5: HS5, hs6: HS6, hs7: HS7 };

const getOnboardingNext = (current, data) => {
  if (current === 1) return data.specialistNeeds === true ? "1b" : 2;
  if (current === "1b") return 2;
  const order = [2, 3, 4, 5, 6, 7];
  const idx = order.indexOf(current);
  return idx < order.length - 1 ? order[idx + 1] : "done";
};

const getOnboardingPrev = (current, data) => {
  if (current === 2) return data.specialistNeeds === true ? "1b" : 1;
  if (current === "1b") return 1;
  const order = [2, 3, 4, 5, 6, 7];
  const idx = order.indexOf(current);
  return idx > 0 ? order[idx - 1] : 1;
};

const getHSNext = current => {
  const order = ["hs1", "hs2", "hs3", "hs4", "hs5", "hs6", "hs7"];
  const idx = order.indexOf(current);
  return idx < order.length - 1 ? order[idx + 1] : null;
};

const getHSPrev = current => {
  const order = ["hs1", "hs2", "hs3", "hs4", "hs5", "hs6", "hs7"];
  const idx = order.indexOf(current);
  return idx > 0 ? order[idx - 1] : null;
};

export default function App() {
  const [view, setView] = useState("onboarding");
  const [onboardingScreen, setOnboardingScreen] = useState(1);
  const [hsScreen, setHSScreen] = useState("hs1");
  const [data, setData] = useState({ adults: [], children: [], pets: { dogs: 0, cats: 0 } });

  const progressIndex = onboardingScreen === "1b" ? 0 : PROGRESS_SCREENS.findIndex(s => s.id === onboardingScreen);

  const handleDashboardNav = (section) => {
    if (section === "onboarding") { setOnboardingScreen(1); setView("onboarding"); }
    else if (section === "homesafe") { setHSScreen("hs1"); setView("homesafe"); }
  };

  const renderContent = () => {
    if (view === "dashboard") {
      return <Dashboard data={data} onNavigate={handleDashboardNav} />;
    }
    if (view === "homesafe") {
      const HSScreen = HS_MAP[hsScreen];
      const nextHS = getHSNext(hsScreen);
      const prevHS = getHSPrev(hsScreen);
      return (
        <>
          <HSProgress current={hsScreen} />
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 24px", WebkitOverflowScrolling: "touch" }}>
            <HSScreen d={data} set={setData} onComplete={() => setView("dashboard")} />
          </div>
          <div style={{ padding: "14px 20px 24px", borderTop: "1px solid " + C.border, background: C.bg, display: "flex", gap: 10, flexShrink: 0 }}>
            {prevHS ? (
              <SecondaryBtn onClick={() => setHSScreen(prevHS)} style={{ flex: 1 }}>Back</SecondaryBtn>
            ) : (
              <SecondaryBtn onClick={() => setView("dashboard")} style={{ flex: 1 }}>Back to plan</SecondaryBtn>
            )}
            {nextHS && hsScreen !== "hs7" && (
              <PrimaryBtn onClick={() => setHSScreen(nextHS)} style={{ flex: 2 }}>Continue</PrimaryBtn>
            )}
          </div>
        </>
      );
    }
    // Onboarding
    const OScreen = ONBOARDING_MAP[onboardingScreen];
    const nextO = getOnboardingNext(onboardingScreen, data);
    const prevO = getOnboardingPrev(onboardingScreen, data);
    return (
      <>
        <div style={{ background: C.bg, padding: "14px 20px 10px", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: C.muted }}>Step {progressIndex + 1} of {PROGRESS_SCREENS.length}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{onboardingScreen === "1b" ? "Specialist Needs" : PROGRESS_SCREENS[progressIndex] && PROGRESS_SCREENS[progressIndex].title}</span>
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {PROGRESS_SCREENS.map((s, i) => (
              <button key={s.id} onClick={() => setOnboardingScreen(s.id)} style={{ flex: 1, height: 6, borderRadius: 99, border: "none", cursor: "pointer", padding: 0, background: i < progressIndex ? C.green : i === progressIndex ? C.accent : C.border }} />
            ))}
          </div>
          <div style={{ display: "flex" }}>
            {PROGRESS_SCREENS.map((s, i) => (
              <button key={s.id} onClick={() => setOnboardingScreen(s.id)} style={{ flex: 1, border: "none", background: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, opacity: i === progressIndex ? 1 : 0.3, padding: "3px 0", color: C.green }}>{s.title.substring(0, 3)}</button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 24px", WebkitOverflowScrolling: "touch" }}>
          <OScreen d={data} set={setData} />
        </div>
        <div style={{ padding: "14px 20px 24px", borderTop: "1px solid " + C.border, background: C.bg, display: "flex", gap: 10, flexShrink: 0 }}>
          {onboardingScreen !== 1 && (
            <SecondaryBtn onClick={() => setOnboardingScreen(getOnboardingPrev(onboardingScreen, data))} style={{ flex: 1 }}>Back</SecondaryBtn>
          )}
          {nextO === "done" ? (
            <PrimaryBtn onClick={() => setView("dashboard")} style={{ flex: 2 }}>Go to my plan</PrimaryBtn>
          ) : (
            <PrimaryBtn onClick={() => setOnboardingScreen(nextO)} style={{ flex: 2 }}>Continue</PrimaryBtn>
          )}
        </div>
      </>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#E5E0D5" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
        <div style={{ background: view === "homesafe" ? C.greenDark : C.green, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>HowSure</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
              {view === "onboarding" && "Setting up your household"}
              {view === "dashboard" && "Emergency Preparedness Plan"}
              {view === "homesafe" && "Make Your Home Safe"}
            </div>
          </div>
          {view !== "onboarding" && (
            <button onClick={() => setView("dashboard")} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              {view === "homesafe" ? "Dashboard" : ""}
            </button>
          )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
