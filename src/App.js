import React, { useState } from "react";
import "./App.css";

const C = {
  bg: "#F5F2EC", card: "#FFFFFF", green: "#2D5A3D", greenLight: "#EAF2EC",
  accent: "#E8845C", text: "#1A1A1A", muted: "#6B7280", border: "#E2DDD5",
  warn: "#FEF3C7", warnBorder: "#F59E0B", warnText: "#92400E",
};

const ADULT_AGES = ["18-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75+"];
const CHILD_AGES = ["Under 6 months", "6-12 months", "12-24 months", "2-4 years", "5-12 years", "13-17 years"];
const INFANT_AGES = ["Under 6 months", "6-12 months", "12-24 months"];

const PROGRESS_SCREENS = [
  { id: 1, icon: "H", title: "Household" },
  { id: 2, icon: "L", title: "Location" },
  { id: 3, icon: "R", title: "Risks" },
  { id: 4, icon: "S", title: "Stores" },
  { id: 5, icon: "D", title: "Dietary" },
  { id: 6, icon: "F", title: "Food Plan" },
  { id: 7, icon: "T", title: "Duration" },
];

function Card({ children, style = {} }) {
  return <div style={{ background: C.card, borderRadius: 16, border: "1px solid " + C.border, padding: 20, marginBottom: 14, ...style }}>{children}</div>;
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, marginBottom: 12 }}>{children}</div>;
}

function InfoBox({ children, color, borderColor, textColor }) {
  return <div style={{ background: color || C.warn, border: "1px solid " + (borderColor || C.warnBorder), borderRadius: 12, padding: "12px 14px", marginBottom: 14, fontSize: 13, color: textColor || C.warnText, lineHeight: 1.6 }}>{children}</div>;
}

function ScreenHeading({ title, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "0 0 8px", fontFamily: "Georgia, serif" }}>{title}</h2>
      <p style={{ fontSize: 15, color: C.muted, margin: 0, lineHeight: 1.5 }}>{sub}</p>
    </div>
  );
}

function SelectPill({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
      {options.map(opt => {
        const on = value === opt;
        return <button key={opt} onClick={() => onChange(opt)} style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.text, border: "1.5px solid " + (on ? C.green : C.border), borderRadius: 99, padding: "7px 14px", fontSize: 13, fontWeight: on ? 700 : 400, cursor: "pointer" }}>{opt}</button>;
      })}
    </div>
  );
}

function PersonCard({ label, onRemove, children }) {
  return (
    <div style={{ background: C.card, borderRadius: 14, border: "1.5px solid " + C.border, marginBottom: 10, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: C.greenLight, borderBottom: "1px solid " + C.border }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>{label}</span>
        <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.muted, padding: "0 4px" }}>x</button>
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
          return <button key={opt} onClick={() => onChange({ ...person, feeding: opt })} style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.text, border: "1.5px solid " + (on ? C.green : C.border), borderRadius: 99, padding: "7px 14px", fontSize: 13, fontWeight: on ? 700 : 400, cursor: "pointer" }}>{opt}</button>;
        })}
      </div>
      <InfoBox>
        WARNING: Formula will be included as an emergency backup regardless of feeding method. Guidelines recommend this for all infants in case the feeding parent is unable to feed.
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
        return <button key={label} onClick={() => onChange(val)} style={{ flex: 1, background: on ? C.green : C.bg, color: on ? "#fff" : C.text, border: "1.5px solid " + (on ? C.green : C.border), borderRadius: 12, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{label}</button>;
      })}
    </div>
  );
}

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

function S1b({ d, set }) {
  return (
    <>
      <ScreenHeading title="Specialist needs planning" sub="We're building this out to make sure no one is left behind." />
      <Card style={{ textAlign: "center", padding: "32px 20px" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.green, marginBottom: 12, fontFamily: "Georgia, serif" }}>Coming soon</div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
          Specialist needs planning is on its way. This will include tailored supply lists, accessibility considerations, medical equipment power requirements, evacuation weight limits, and more.
        </div>
        <div style={{ background: C.greenLight, borderRadius: 12, padding: "14px 16px", fontSize: 13, color: C.green, lineHeight: 1.6, textAlign: "left" }}>
          We have noted that your household has specialist needs. This will be factored into your plan as we develop this feature.
        </div>
      </Card>
      <InfoBox>
        Guidelines suggest discussing emergency planning with your GP or specialist if any household member has significant medical dependencies or equipment needs.
      </InfoBox>
    </>
  );
}

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
            <div style={{ fontSize: 44 }}>pin</div>
            <div style={{ background: C.green, color: "#fff", borderRadius: 10, padding: "8px 20px", fontSize: 14, fontWeight: 700, marginTop: 8 }}>Tap to place your pin</div>
          </div>
          <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(255,255,255,0.93)", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: "#1a6aaa", fontWeight: 700 }}>River 2.1km</div>
          <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(255,255,255,0.93)", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: C.green, fontWeight: 700 }}>180m elev.</div>
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
    { id: "volcanic", label: "Volcanic" },
    { id: "landslip", label: "Landslip" },
    { id: "storm", label: "Severe Storm" },
    { id: "wildfire", label: "Wildfire" },
    { id: "isolation", label: "Supply Cut-off" },
  ];
  const sel = d.risks || ["earthquake", "isolation"];
  const toggle = id => set(p => ({ ...p, risks: sel.includes(id) ? sel.filter(r => r !== id) : [...sel, id] }));
  return (
    <>
      <ScreenHeading title="What risks apply to you?" sub="Pre-filled from your location - adjust to match your situation." />
      <InfoBox>Canterbury detected - earthquake and supply cut-off risk auto-selected</InfoBox>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {risks.map(r => {
          const on = sel.includes(r.id);
          return (
            <button key={r.id} onClick={() => toggle(r.id)} style={{ background: on ? C.greenLight : C.card, border: "2px solid " + (on ? C.green : C.border), borderRadius: 16, padding: "18px 12px", cursor: "pointer", textAlign: "left" }}>
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
              <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{s.dist} - {s.tag}</div>
            </div>
            {on && <div style={{ fontSize: 16, color: C.green, fontWeight: 700 }}>Selected</div>}
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
            <button key={o.id} onClick={() => toggle(o.id)} style={{ background: on ? C.greenLight : C.card, border: "2px solid " + (on ? C.green : C.border), borderRadius: 16, padding: "18px 12px", cursor: "pointer", textAlign: "center" }}>
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
    { id: "balanced", label: "Balanced & Practical", desc: "Variety and palatability. Budget-conscious, nothing fancy.", est: "~$320" },
    { id: "comfortable", label: "Comfortable Living", desc: "More variety, better flavour, closer to normal eating.", est: "~$520" },
  ];
  const sel = d.tier || "balanced";
  return (
    <>
      <ScreenHeading title="What kind of food plan?" sub="Start with essentials - you can top up with extras later." />
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
        Lock in essentials first - guidelines suggest topping up with flavour and variety once your core supplies are secured.
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
        Your situation: Canterbury rural + earthquake + supply cut-off. Roads could be blocked for weeks. Guidelines suggest 8 weeks minimum for your region.
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
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>2 adults - 8 weeks - balanced plan - staged weekly orders</div>
      </Card>
      <button onClick={() => alert("Plan generation coming soon!")} style={{ width: "100%", background: C.green, color: "#fff", border: "none", borderRadius: 16, padding: "18px", fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia, serif" }}>
        Build My Plan
      </button>
    </>
  );
}

const SCREEN_MAP = { 1: S1, "1b": S1b, 2: S2, 3: S3, 4: S4, 5: S5, 6: S6, 7: S7 };

const getNext = (current, data) => {
  if (current === 1) return data.specialistNeeds === true ? "1b" : 2;
  if (current === "1b") return 2;
  const order = [2, 3, 4, 5, 6, 7];
  const idx = order.indexOf(current);
  return idx < order.length - 1 ? order[idx + 1] : null;
};

const getPrev = (current, data) => {
  if (current === 2) return data.specialistNeeds === true ? "1b" : 1;
  if (current === "1b") return 1;
  const order = [2, 3, 4, 5, 6, 7];
  const idx = order.indexOf(current);
  return idx > 0 ? order[idx - 1] : 1;
};

export default function App() {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState({ adults: [], children: [], pets: { dogs: 0, cats: 0 } });
  const Screen = SCREEN_MAP[current];
  const progressIndex = current === "1b" ? 0 : PROGRESS_SCREENS.findIndex(s => s.id === current);

  return (
    <div style={{ minHeight: "100vh", background: "#E5E0D5" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
        <div style={{ background: C.green, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>HowSure</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Emergency Preparedness Planner</div>
          </div>
        </div>
        <div style={{ background: C.bg, padding: "14px 20px 10px", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: C.muted }}>Step {progressIndex + 1} of {PROGRESS_SCREENS.length}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{current === "1b" ? "Specialist Needs" : PROGRESS_SCREENS[progressIndex] && PROGRESS_SCREENS[progressIndex].title}</span>
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {PROGRESS_SCREENS.map((s, i) => (
              <button key={s.id} onClick={() => setCurrent(s.id)} style={{ flex: 1, height: 6, borderRadius: 99, border: "none", cursor: "pointer", padding: 0, background: i < progressIndex ? C.green : i === progressIndex ? C.accent : C.border }} />
            ))}
          </div>
          <div style={{ display: "flex" }}>
            {PROGRESS_SCREENS.map((s, i) => (
              <button key={s.id} onClick={() => setCurrent(s.id)} style={{ flex: 1, border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, opacity: i === progressIndex ? 1 : 0.3, padding: "2px 0", color: C.green }}>{s.icon}</button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 24px", WebkitOverflowScrolling: "touch" }}>
          <Screen d={data} set={setData} />
        </div>
        <div style={{ padding: "14px 20px 24px", borderTop: "1px solid " + C.border, background: C.bg, display: "flex", gap: 10, flexShrink: 0 }}>
          {current !== 1 && (
            <button onClick={() => setCurrent(getPrev(current, data))} style={{ flex: 1, background: C.card, border: "1.5px solid " + C.border, borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 600, cursor: "pointer", color: C.text, fontFamily: "Georgia, serif" }}>Back</button>
          )}
          {getNext(current, data) && (
            <button onClick={() => setCurrent(getNext(current, data))} style={{ flex: 2, background: C.green, border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", color: "#fff", fontFamily: "Georgia, serif" }}>Continue</button>
          )}
        </div>
      </div>
    </div>
  );
}
