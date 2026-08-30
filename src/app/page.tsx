"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Command,
  FileText,
  Filter,
  Gauge,
  Layers3,
  MapPin,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Play,
  Search,
  Send,
  Settings2,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";

type Property = {
  id: number;
  name: string;
  location: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  image: string;
  tag: string;
  match: number;
};

const properties: Property[] = [
  { id: 1, name: "The Glass House", location: "Hillside, Austin", price: "$2.84M", beds: "4 beds", baths: "4.5 baths", sqft: "3,860 sq ft", tag: "Top match", match: 98, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85" },
  { id: 2, name: "Sage Canyon Estate", location: "Westlake, Austin", price: "$3.25M", beds: "5 beds", baths: "5 baths", sqft: "4,920 sq ft", tag: "High value", match: 91, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85" },
  { id: 3, name: "No. 12 Waller Creek", location: "Downtown, Austin", price: "$1.96M", beds: "3 beds", baths: "3.5 baths", sqft: "2,480 sq ft", tag: "Urban edit", match: 84, image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85" },
];

const suggestions = [
  "Show me homes with a private office",
  "What is the best investment in Westlake?",
  "I’m ready to book a viewing",
];

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [activeDemo, setActiveDemo] = useState("High-Net-Worth Buyer");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { from: "ai", text: "Good morning, Alex. I’m Atlas, your private property concierge. I’ve reviewed today’s active inventory and can help you find a home that feels exactly right." },
    { from: "ai", text: "To begin, what kind of move are you planning?" },
  ]);
  const [booked, setBooked] = useState(false);
  const [observability, setObservability] = useState(false);
  const property = properties[selected];
  const score = activeDemo === "First-Time Homebuyer" ? 72 : activeDemo === "Commercial Investor" ? 84 : 96;

  const telemetry = useMemo(() => JSON.stringify({
    event: "lead.score.updated",
    lead_id: "ld_02841",
    tier: score > 90 ? "HOT" : "WARM",
    intent_score: score,
    signals: ["cash_ready", "timeline_0_3_months", "location_match"],
    next_best_action: "schedule_private_viewing",
    updated_at: "2026-08-30T09:42:18Z",
  }, null, 2), [score]);

  function sendMessage(text = message) {
    if (!text.trim()) return;
    setChat((items) => [...items, { from: "user", text }, { from: "ai", text: "Understood. I’m refining the private collection around that preference — your match profile is now 96% complete. I recommend starting with The Glass House." }]);
    setMessage("");
  }

  function simulate(label: string) {
    setActiveDemo(label);
    setChat((items) => [...items, { from: "ai", text: `Simulation loaded: ${label}. I’ve recalibrated the discovery path and intent score for this buyer profile.` }]);
  }

  return (
    <main className="min-h-screen bg-[#f8f8f5] text-[#0f1115]">
      <header className="border-b border-[#e3e3dc] bg-white/90 px-5 py-3 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <div className="flex items-center gap-8"><div className="flex items-center gap-3"><div className="grid h-8 w-8 place-items-center rounded-sm bg-[#0f1115] text-[#d4af37]"><Layers3 size={16} /></div><div><div className="font-serif text-lg tracking-tight">Aurelia</div><div className="-mt-1 text-[8px] uppercase tracking-[.28em] text-[#8b8b85]">Property Intelligence</div></div></div><nav className="hidden items-center gap-6 text-xs font-medium text-[#74756e] lg:flex"><span className="border-b-2 border-[#d4af37] pb-4 pt-4 text-[#0f1115]">Concierge</span><span>Pipeline</span><span>Inventory</span><span>Analytics</span></nav></div>
          <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-md border border-[#e1e1dc] px-3 py-2 text-xs text-[#777870] sm:flex"><Command size={13} /> Search <kbd className="ml-3 rounded bg-[#f1f1ed] px-1.5 py-0.5 text-[10px]">⌘ K</kbd></div><button className="relative rounded-md p-2 text-[#676860] hover:bg-[#f3f2ee]"><Bell size={17}/><i className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#d4af37]" /></button><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d9c8a2] text-xs font-semibold">JD</div><button className="lg:hidden"><Menu size={19}/></button></div>
        </div>
      </header>

      <section className="border-b border-[#deded7] bg-[#101216] px-5 py-2.5 text-white md:px-8"><div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-[11px] tracking-wide"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[#101216]"><Sparkles size={11}/></span><b className="font-medium">Demo Simulation Mode</b><span className="text-white/40">/</span><span className="text-white/55">Explore the full agentic workflow</span></div><div className="flex flex-wrap items-center gap-2"><button onClick={() => simulate("High-Net-Worth Buyer")} className={`rounded px-3 py-1.5 text-[10px] transition ${activeDemo === "High-Net-Worth Buyer" ? "bg-[#d4af37] font-semibold text-[#101216]" : "border border-white/20 text-white/70 hover:border-white/50"}`}>Simulate High-Net-Worth Buyer</button><button onClick={() => simulate("First-Time Homebuyer")} className={`hidden rounded px-3 py-1.5 text-[10px] transition sm:block ${activeDemo === "First-Time Homebuyer" ? "bg-[#d4af37] font-semibold text-[#101216]" : "border border-white/20 text-white/70 hover:border-white/50"}`}>First-Time Homebuyer</button><button onClick={() => simulate("Commercial Investor")} className={`hidden rounded px-3 py-1.5 text-[10px] transition md:block ${activeDemo === "Commercial Investor" ? "bg-[#d4af37] font-semibold text-[#101216]" : "border border-white/20 text-white/70 hover:border-white/50"}`}>Commercial Investor</button></div></div></section>

      <div className="mx-auto max-w-[1600px] px-5 pb-10 md:px-8"><div className="flex items-end justify-between py-8"><div><div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-[#a18848]"><span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]"/> Live workspace</div><h1 className="font-serif text-3xl tracking-tight md:text-4xl">The Private Collection</h1><p className="mt-2 text-sm text-[#7b7c74]">A real-time view of your AI-assisted buyer discovery.</p></div><div className="hidden items-center gap-2 text-right text-[10px] text-[#83847d] sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-500"/> Systems operational <span className="mx-2 text-[#d0d0c9]">|</span> 09:42 AM CST</div></div>

        <div className="mb-7 grid gap-px overflow-hidden rounded-lg border border-[#deded7] bg-[#deded7] sm:grid-cols-3"><Metric icon={<ArrowUpRight size={15}/>} value="+38%" label="Lead-to-Tour Conversion" detail="vs. previous quarter"/><Metric icon={<Clock3 size={15}/>} value="18 hrs" label="Agent Hours Saved / Week" detail="per active agent"/><Metric icon={<CircleDollarSign size={15}/>} value="$4.8M" label="Qualified Pipeline Value" detail="+12.4% this month"/></div>

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(390px,.8fr)]"><section className="min-w-0 rounded-lg border border-[#deded7] bg-white"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8e8e3] px-5 py-4"><div><h2 className="font-serif text-xl">Curated for your buyers</h2><p className="mt-0.5 text-[11px] text-[#8a8b84]">3 active recommendations <span className="mx-1">·</span> Updated just now</p></div><div className="flex gap-2"><button className="flex items-center gap-2 rounded border border-[#deded7] px-3 py-2 text-[11px] text-[#64665e] hover:border-[#b7a46d]"><Filter size={13}/> Filters</button><button className="rounded border border-[#deded7] p-2 text-[#64665e] hover:border-[#b7a46d]"><MoreHorizontal size={15}/></button></div></div><div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">{properties.map((item, index) => <PropertyCard key={item.id} property={item} active={selected === index} onClick={() => setSelected(index)} />)}</div><div className="border-t border-[#e8e8e3] px-5 py-3.5"><button className="flex items-center gap-1 text-[11px] font-semibold text-[#a18848]">View all inventory <ArrowUpRight size={13}/></button></div></section>

          <aside className="overflow-hidden rounded-lg border border-[#deded7] bg-white"><div className="flex items-center justify-between border-b border-[#e8e8e3] px-5 py-4"><div className="flex items-center gap-2"><div className="grid h-7 w-7 place-items-center rounded-full bg-[#eee6d0] text-[#a18848]"><Sparkles size={14}/></div><div><h2 className="text-sm font-semibold">Atlas Concierge</h2><p className="text-[10px] text-[#8b8c84]">AI qualification agent <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"/></p></div></div><button className="text-[#969790]"><Settings2 size={15}/></button></div><div className="border-b border-[#e8e8e3] bg-[#fafaf8] px-5 py-3"><div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#90918a]">Current lead</span><span className="rounded-full bg-[#f4e7bd] px-2 py-1 text-[10px] font-bold text-[#876d29]">{score > 90 ? "HOT · SERIOUS BUYER" : "WARM · ACTIVE"}</span></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#c9d3d1] text-[11px] font-semibold">AM</div><div><div className="text-xs font-semibold">Alex Morgan</div><div className="text-[10px] text-[#868780]">Lead ID · ld_02841</div></div></div><div className="text-right"><div className="font-serif text-xl text-[#a18848]">{score}</div><div className="text-[9px] uppercase tracking-wider text-[#999a92]">intent score</div></div></div><div className="mt-3 h-1 overflow-hidden rounded-full bg-[#e6e5df]"><div style={{width: `${score}%`}} className="h-full rounded-full bg-[#d4af37] transition-all"/></div></div><div className="flex h-[390px] flex-col px-5 py-4"><div className="flex-1 space-y-4 overflow-y-auto pr-1">{chat.map((entry, index) => <div key={index} className={`flex gap-2.5 ${entry.from === "user" ? "justify-end" : ""}`}>{entry.from === "ai" && <div className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#eee6d0] text-[#a18848]"><Sparkles size={12}/></div>}<div className={`max-w-[86%] rounded-lg px-3 py-2.5 text-[11px] leading-relaxed ${entry.from === "user" ? "bg-[#101216] text-white" : "bg-[#f3f2ee] text-[#4f514c]"}`}>{entry.text}</div></div>)}</div><div className="mt-3 flex flex-wrap gap-1.5">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => sendMessage(suggestion)} className="rounded-full border border-[#dddcd5] px-2.5 py-1.5 text-[10px] text-[#73746d] hover:border-[#c4a956] hover:text-[#9a7c2e]">{suggestion}</button>)}</div><div className="mt-3 flex items-center gap-2 rounded-md border border-[#dcdcd5] bg-white px-3 py-2 focus-within:border-[#c4a956]"><input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMessage()} placeholder="Ask Atlas anything..." className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#aaa9a1]"/><button onClick={() => sendMessage()} className="text-[#a18848] hover:text-[#806421]"><Send size={15}/></button></div></div></aside>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]"> <section className="rounded-lg border border-[#deded7] bg-[#101216] p-5 text-white"><div className="flex items-start justify-between"><div><div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-[#d4af37]"><Play size={11} fill="currentColor"/> Virtual tour gallery</div><h2 className="font-serif text-2xl">{property.name}</h2><div className="mt-1 flex items-center gap-1 text-[11px] text-white/55"><MapPin size={12}/> {property.location} <span className="mx-1 text-white/20">·</span> {property.price}</div></div><button className="rounded border border-white/15 p-2 text-white/65 hover:border-[#d4af37] hover:text-[#d4af37]"><ExpandIcon /></button></div><div className="relative mt-5 h-52 overflow-hidden rounded-md sm:h-64"><img src={property.image} alt={property.name} className="h-full w-full object-cover opacity-80"/><div className="absolute inset-0 bg-gradient-to-t from-[#101216]/80 via-transparent to-transparent"/><div className="absolute bottom-4 left-4 flex items-center gap-2"><button onClick={() => setSelected((selected + properties.length - 1) % properties.length)} className="grid h-8 w-8 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/30"><ChevronLeft size={15}/></button><button onClick={() => setSelected((selected + 1) % properties.length)} className="grid h-8 w-8 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/30"><ChevronRight size={15}/></button><span className="ml-2 text-[10px] text-white/65">01 / 08 · Exterior perspective</span></div><div className="absolute bottom-4 right-4 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-[10px] backdrop-blur">360° Virtual Tour</div></div></section><section className="rounded-lg border border-[#deded7] bg-white p-5"><div className="flex items-center justify-between"><div><div className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#a18848]">Next best action</div><h2 className="mt-1 font-serif text-xl">Convert intent into a visit</h2></div><CalendarDays className="text-[#b69a4d]" size={21}/></div><p className="mt-3 text-xs leading-relaxed text-[#7a7b74]">Alex has viewed 4 matched properties and signaled cash readiness. The Glass House is the strongest lifestyle fit.</p><div className="mt-4 grid grid-cols-2 gap-2"><div className="rounded border border-[#e5e5df] p-3"><div className="text-[10px] text-[#8d8e87]">Suggested slot</div><div className="mt-1 text-xs font-semibold">Tue, Sep 2 · 11:30 AM</div></div><div className="rounded border border-[#e5e5df] p-3"><div className="text-[10px] text-[#8d8e87]">Tour type</div><div className="mt-1 text-xs font-semibold">Private in-person</div></div></div><button onClick={() => setBooked(true)} className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md py-3 text-xs font-semibold transition ${booked ? "bg-emerald-700 text-white" : "bg-[#101216] text-white hover:bg-[#2c2f35]"}`}>{booked ? <><Check size={15}/> Viewing confirmed</> : <>Book private viewing <ArrowUpRight size={14}/></>}</button><button onClick={() => setObservability(true)} className="mt-3 flex w-full items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[.13em] text-[#8d8e87] hover:text-[#a18848]"><Gauge size={13}/> Open agent observability</button></section></div>
      </div>

      {observability && <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setObservability(false)}><div onClick={(event) => event.stopPropagation()} className="absolute right-0 top-0 h-full w-full max-w-[470px] overflow-y-auto border-l border-[#2c3034] bg-[#17191d] p-6 text-white shadow-2xl"><div className="flex items-center justify-between"><div><div className="text-[10px] uppercase tracking-[.2em] text-[#d4af37]">Live telemetry</div><h2 className="mt-1 font-serif text-2xl">Agent observability</h2></div><button onClick={() => setObservability(false)}><X size={18} className="text-white/50 hover:text-white"/></button></div><div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded border border-white/10 bg-white/5 p-4"><div className="text-[10px] text-white/45">Intent velocity</div><div className="mt-2 text-2xl font-light text-[#d4af37]">+14.8%</div><div className="mt-1 text-[10px] text-emerald-400">↑ 2.4% this session</div></div><div className="rounded border border-white/10 bg-white/5 p-4"><div className="text-[10px] text-white/45">Qualification</div><div className="mt-2 text-2xl font-light">{score}/100</div><div className="mt-1 text-[10px] text-[#d4af37]">Hot lead tier</div></div></div><div className="mt-5 rounded border border-white/10 bg-[#0d0f12] p-4"><div className="mb-3 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[.16em] text-white/50">Structured event payload</span><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/></div><pre className="overflow-x-auto text-[10px] leading-relaxed text-[#b6c7b5]">{telemetry}</pre></div><div className="mt-5 space-y-3"><TelemetryRow icon={<MessageSquare size={14}/>} label="Conversation state" value="QUALIFYING → READY"/><TelemetryRow icon={<Search size={14}/>} label="Tool executed" value="filter_properties()"/><TelemetryRow icon={<FileText size={14}/>} label="Agent brief" value="Drafted · WhatsApp + Email"/><TelemetryRow icon={<UsersRound size={14}/>} label="Assigned agent" value="Jordan Davis · Online"/></div></div></div>}
    </main>
  );
}

function Metric({ icon, value, label, detail }: { icon: React.ReactNode; value: string; label: string; detail: string }) { return <div className="flex items-center gap-3 bg-white px-5 py-4"><div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f4efdf] text-[#a18848]">{icon}</div><div><div className="flex items-baseline gap-2"><strong className="font-serif text-xl font-normal">{value}</strong><span className="text-[11px] font-medium text-[#555750]">{label}</span></div><div className="mt-0.5 text-[10px] text-[#999a92]">{detail}</div></div></div> }
function PropertyCard({ property, active, onClick }: { property: Property; active: boolean; onClick: () => void }) { return <button onClick={onClick} className={`group overflow-hidden rounded-md border text-left transition hover:-translate-y-0.5 hover:shadow-md ${active ? "border-[#c3a452] ring-1 ring-[#c3a452]" : "border-[#e5e5df]"}`}><div className="relative h-36 overflow-hidden"><img src={property.image} alt={property.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute left-2.5 top-2.5 rounded-sm bg-white/90 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#88702e]">{property.tag}</span><span className="absolute right-2.5 top-2.5 rounded-sm bg-[#101216]/75 px-2 py-1 text-[9px] font-semibold text-white">{property.match}% match</span></div><div className="p-3"><div className="flex items-start justify-between gap-2"><div><h3 className="font-serif text-base">{property.name}</h3><div className="mt-0.5 flex items-center gap-1 text-[10px] text-[#878880]"><MapPin size={10}/>{property.location}</div></div><span className="text-xs font-semibold">{property.price}</span></div><div className="mt-3 flex gap-3 border-t border-[#eeeeea] pt-2.5 text-[10px] text-[#74756e]"><span>{property.beds}</span><span>{property.baths}</span><span>{property.sqft}</span></div></div></button> }
function TelemetryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center justify-between border-b border-white/10 pb-3"><div className="flex items-center gap-2 text-white/55">{icon}<span className="text-[11px]">{label}</span></div><span className="text-[10px] font-medium text-[#d4af37]">{value}</span></div> }
function ExpandIcon() { return <span className="block h-3.5 w-3.5 border border-current"><span className="relative -right-1.5 -top-1.5 block h-3.5 w-3.5 border border-current bg-[#101216]" /></span> }
