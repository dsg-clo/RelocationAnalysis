import React, { useState } from "react";
import { calcExisting, calcCandidate } from "./scoring";

export default function InputForm({ onCalculationComplete }) {
  const [tab, setTab] = useState("exist");
  const [d, setD] = useState({
    existName: "",
    existBriCount2km: 2,
    existBriDistLt1: true,
    existBriType: "KCP",
    existPeersCount2km: 1,
    existPeersDistLt1: true,
    existPotensi: "Growth",
    existPerf: "Medium",
    candName: "",
    candBriCount2km: 0,
    candBriDistLt1: false,
    candBriType: "None",
    candPeersCount2km: 3,
    candPeersDistLt1: true,
    candPotensi: "Star",
  });

  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));

  const handleCalc = () => {
    const existResult = calcExisting(d);
    const candResult = calcCandidate(d);
    onCalculationComplete({
      inputData: d,
      existResult,
      candResult,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-4 animate-fadeIn text-left">
      {/*Header */}
      <div className="relative rounded-3xl p-6 bg-[#0b1426]/60 border border-blue-500/20 shadow-2xl overflow-hidden mb-6 backdrop-blur-xl text-left">
        <div className="absolute -top-24 -left-20 w-72 h-72 bg-[#003087]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-10 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-400 tracking-widest uppercase flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ONLINE
            </div>

            {/* UBAH BAGIAN JUDUL H1 NYA JADI SEPERTI INI */}
            <h1
              className="text-3xl md:text-4xl font-extrabold m-0 p-0 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 font-sans"
              style={{
                letterSpacing: "-0.05em", // Mempersempit jarak antar huruf biar padat kek dashboard premium
                textShadow: "0 2px 10px rgba(255,255,255,0.05)",
              }}
            >
              BRANCH RELOCATION ANALYSIS
            </h1>

            <div className="text-xs text-blue-200 mt-1 font-medium opacity-90 flex items-center gap-1.5">
              by Channel Location Optimization Team
            </div>
          </div>
          {/* <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 font-mono text-[10px]">
            <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-slate-300 flex items-center gap-1.5 backdrop-blur-md shadow-inner select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              System : <span className="text-white font-bold">ONLINE</span>
            </div>
          </div> */}
        </div>

        {/* Thin Tech Line — Efek garis bias cahaya di dasar komponen */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      {/* Switcher Tab Menu */}
      <div className="flex p-1.5 bg-[#112240] rounded-2xl mb-5 gap-1">
        <button
          type="button"
          onClick={() => setTab("exist")}
          className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            tab === "exist"
              ? "bg-[#003087] text-white shadow-lg"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          🏢 1. Existing Location
        </button>
        <button
          type="button"
          onClick={() => setTab("cand")}
          className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            tab === "cand"
              ? "bg-[#f77f00] text-white shadow-lg"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          🎯 2. Candidate Location
        </button>
      </div>

      {/* Main Parameters Panel */}
      <div className="bg-[#0b1426]/70 border border-blue-900/40 rounded-3xl p-6 mb-5 backdrop-blur-xl">
        <div className="mb-5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2">
            {tab === "exist"
              ? "Nama Unit Kantor Existing"
              : "Nama Lokasi Kandidat Baru"}
          </label>
          <input
            value={tab === "exist" ? d.existName : d.candName}
            onChange={(e) =>
              set(tab === "exist" ? "existName" : "candName", e.target.value)
            }
            className={`w-full bg-[#112240] border rounded-xl p-3 text-white font-medium text-sm focus:outline-none transition ${
              tab === "exist"
                ? "border-blue-900/40 focus:border-blue-500"
                : "border-orange-900/40 focus:border-orange-500"
            }`}
          />
        </div>

        <hr className="border-white/5 mb-5" />

        {tab === "exist" ? (
          <ExistingPanel d={d} set={set} />
        ) : (
          <CandidatePanel d={d} set={set} />
        )}
      </div>

      {/* Action Submit */}
      <button
        onClick={handleCalc}
        className="w-full py-4 bg-gradient-to-r from-[#003087] via-[#0056b3] to-[#f77f00] hover:brightness-110 active:scale-99 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl transition cursor-pointer"
      >
        📊 Jalankan Kalkulasi Matriks Skor →
      </button>
    </div>
  );
}

// ─── HELPER MOCK SUB-COMPONENTS FOR OPTIONS ───────────────────────────────

function SectionLabel({ color, children }) {
  return (
    <div
      className={`text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${color}`}
    >
      {children}
      <span className="flex-1 h-px bg-white/5"></span>
    </div>
  );
}

function OptionGrid({ cols = 2, children }) {
  const colMap = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  };
  return <div className={`grid ${colMap[cols]} gap-2 mb-4`}>{children}</div>;
}

function OCard({ label, sub, score, selected, onClick, theme }) {
  const sel = selected
    ? theme === "blue"
      ? "border-blue-500 bg-blue-500/10"
      : "border-orange-500 bg-orange-500/10"
    : "border-white/5 bg-[#0e1726]/40 hover:bg-[#112240] hover:border-white/15";

  const scoreColor = selected
    ? theme === "blue"
      ? "text-blue-400"
      : "text-orange-400"
    : "text-slate-500";

  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-3 cursor-pointer transition text-center ${sel}`}
    >
      <div className="text-xs font-semibold text-slate-200 leading-tight">
        {label}
      </div>
      {sub && (
        <div className="text-[10px] text-slate-500 mt-1 leading-tight">
          {sub}
        </div>
      )}
      {score !== undefined && (
        <div
          className={`font-mono text-[11px] mt-1.5 font-medium ${scoreColor}`}
        >
          {score}%
        </div>
      )}
    </div>
  );
}

function ExistingPanel({ d, set }) {
  return (
    <div className="animate-slideRight">
      <SectionLabel color="text-blue-400">
        Kehadiran UKO BRI (Bobot 20%)
      </SectionLabel>
      <div className="text-[11px] text-slate-400 mb-2 flex justify-between">
        <span>Jumlah UKO BRI dalam 2 km</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono text-slate-500">
          Bobot 80%
        </span>
      </div>
      <OptionGrid cols={2}>
        <OCard
          label="> 1 UKO BRI"
          sub="Lebih dari satu unit"
          score={100}
          selected={d.existBriCount2km > 1}
          onClick={() => set("existBriCount2km", 2)}
          theme="blue"
        />
        <OCard
          label="Tidak Ada UKO"
          sub="Maksimal 1 unit"
          score={25}
          selected={d.existBriCount2km <= 1}
          onClick={() => set("existBriCount2km", 0)}
          theme="blue"
        />
      </OptionGrid>

      <div className="text-[11px] text-slate-400 mb-2 flex justify-between">
        <span>Jarak ke UKO BRI Terdekat</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono text-slate-500">
          Bobot 20%
        </span>
      </div>
      <OptionGrid cols={2}>
        <OCard
          label="< 1 km"
          sub="Ada UKO dekat"
          selected={d.existBriDistLt1}
          onClick={() => set("existBriDistLt1", true)}
          theme="blue"
        />
        <OCard
          label="> 1 km"
          sub="Jarak di atas 1 km"
          score={25}
          selected={!d.existBriDistLt1}
          onClick={() => {
            set("existBriDistLt1", false);
            set("existBriType", "None");
          }}
          theme="blue"
        />
      </OptionGrid>

      {d.existBriDistLt1 && (
        <>
          <div className="text-[11px] text-blue-400/80 mb-2 font-medium">
            Tipe Jaringan Kerja BRI Terdekat (&lt; 1 km)
          </div>
          <OptionGrid cols={4}>
            <OCard
              label="KC"
              sub="Kantor Cabang"
              score={100}
              selected={d.existBriType === "KC"}
              onClick={() => set("existBriType", "KC")}
              theme="blue"
            />
            <OCard
              label="KCP"
              sub="Cabang Pembantu"
              score={60}
              selected={d.existBriType === "KCP"}
              onClick={() => set("existBriType", "KCP")}
              theme="blue"
            />
            <OCard
              label="Unit"
              sub="Unit Kerja"
              score={30}
              selected={d.existBriType === "Unit"}
              onClick={() => set("existBriType", "Unit")}
              theme="blue"
            />
            <OCard
              label="KK"
              sub="Kantor Kas"
              score={10}
              selected={d.existBriType === "KK"}
              onClick={() => set("existBriType", "KK")}
              theme="blue"
            />
          </OptionGrid>
        </>
      )}

      <hr className="border-white/5 my-4" />
      <SectionLabel color="text-blue-400">
        Kehadiran UKO Peers (Bobot 20%)
      </SectionLabel>
      <div className="text-[11px] text-slate-400 mb-2 flex justify-between">
        <span>Keberadaan Jumlah Peers Bank dalam 2 km</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono text-slate-500">
          Bobot 80%
        </span>
      </div>
      <OptionGrid cols={2}>
        <OCard
          label="Terdapat Peers"
          sub="Ada kompetitor"
          score={25}
          selected={d.existPeersCount2km > 0}
          onClick={() => set("existPeersCount2km", 1)}
          theme="blue"
        />
        <OCard
          label="Tidak Ada Peers"
          sub="Bersih dari kompetitor"
          score={100}
          selected={d.existPeersCount2km === 0}
          onClick={() => set("existPeersCount2km", 0)}
          theme="blue"
        />
      </OptionGrid>

      <div className="text-[11px] text-slate-400 mb-2 flex justify-between">
        <span>Jarak Terhadap UKO Peers Terdekat</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono text-slate-500">
          Bobot 20%
        </span>
      </div>
      <OptionGrid cols={2}>
        <OCard
          label="< 1 km"
          sub="Kompetitor dekat"
          score={25}
          selected={d.existPeersDistLt1}
          onClick={() => set("existPeersDistLt1", true)}
          theme="blue"
        />
        <OCard
          label="> 1 km"
          sub="Kompetitor jauh"
          score={100}
          selected={!d.existPeersDistLt1}
          onClick={() => set("existPeersDistLt1", false)}
          theme="blue"
        />
      </OptionGrid>

      <hr className="border-white/5 my-4" />
      <SectionLabel color="text-blue-400">
        Potensi Wilayah — Network Optimization (Bobot 40%)
      </SectionLabel>
      <OptionGrid cols={4}>
        <OCard
          label="Star"
          sub="Sangat Potensial"
          score={25}
          selected={d.existPotensi === "Star"}
          onClick={() => set("existPotensi", "Star")}
          theme="blue"
        />
        <OCard
          label="Growth"
          sub="Berkembang"
          score={50}
          selected={d.existPotensi === "Growth"}
          onClick={() => set("existPotensi", "Growth")}
          theme="blue"
        />
        <OCard
          label="Saturated"
          sub="Padat / Jenuh"
          score={75}
          selected={d.existPotensi === "Saturated"}
          onClick={() => set("existPotensi", "Saturated")}
          theme="blue"
        />
        <OCard
          label="Laggard"
          sub="Tertinggal"
          score={100}
          selected={d.existPotensi === "Laggard"}
          onClick={() => set("existPotensi", "Laggard")}
          theme="blue"
        />
      </OptionGrid>

      <hr className="border-white/5 my-4" />
      <SectionLabel color="text-blue-400">
        Performance Unit (Bobot 20%)
      </SectionLabel>
      <OptionGrid cols={3}>
        <OCard
          label="High"
          sub="Kinerja Tinggi"
          score={25}
          selected={d.existPerf === "High"}
          onClick={() => set("existPerf", "High")}
          theme="blue"
        />
        <OCard
          label="Medium"
          sub="Kinerja Sedang"
          score={50}
          selected={d.existPerf === "Medium"}
          onClick={() => set("existPerf", "Medium")}
          theme="blue"
        />
        <OCard
          label="Low"
          sub="Kinerja Rendah"
          score={100}
          selected={d.existPerf === "Low"}
          onClick={() => set("existPerf", "Low")}
          theme="blue"
        />
      </OptionGrid>
    </div>
  );
}

function CandidatePanel({ d, set }) {
  return (
    <div className="animate-slideRight">
      <SectionLabel color="text-orange-400">
        Kehadiran UKO BRI (Bobot 20%)
      </SectionLabel>
      <div className="text-[11px] text-slate-400 mb-2 flex justify-between">
        <span>Jumlah UKO BRI dalam 2 km</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono text-slate-500">
          Bobot 20%
        </span>
      </div>
      <OptionGrid cols={2}>
        <OCard
          label="> 1 UKO BRI"
          sub="Sudah jenuh"
          score={0}
          selected={d.candBriCount2km > 1}
          onClick={() => set("candBriCount2km", 2)}
          theme="orange"
        />
        <OCard
          label="Tidak Ada UKO"
          sub="Kosong / Belum terlayani"
          score={100}
          selected={d.candBriCount2km <= 1}
          onClick={() => set("candBriCount2km", 0)}
          theme="orange"
        />
      </OptionGrid>

      <div className="text-[11px] text-slate-400 mb-2 flex justify-between">
        <span>Jarak Terhadap UKO BRI Terdekat</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono text-slate-500">
          Bobot 80%
        </span>
      </div>
      <OptionGrid cols={5}>
        <OCard
          label="< 1km KC"
          sub="Ada Cabang"
          score={25}
          selected={d.candBriType === "KC" && d.candBriDistLt1}
          onClick={() => {
            set("candBriType", "KC");
            set("candBriDistLt1", true);
          }}
          theme="orange"
        />
        <OCard
          label="< 1km KCP"
          sub="Ada Pembantu"
          score={50}
          selected={d.candBriType === "KCP" && d.candBriDistLt1}
          onClick={() => {
            set("candBriType", "KCP");
            set("candBriDistLt1", true);
          }}
          theme="orange"
        />
        <OCard
          label="< 1km Unit"
          sub="Ada Unit"
          score={75}
          selected={d.candBriType === "Unit" && d.candBriDistLt1}
          onClick={() => {
            set("candBriType", "Unit");
            set("candBriDistLt1", true);
          }}
          theme="orange"
        />
        <OCard
          label="< 1km KK"
          sub="Ada Kas"
          score={90}
          selected={d.candBriType === "KK" && d.candBriDistLt1}
          onClick={() => {
            set("candBriType", "KK");
            set("candBriDistLt1", true);
          }}
          theme="orange"
        />
        <OCard
          label="Tidak Ada / > 1km"
          sub="Aman"
          score={100}
          selected={d.candBriType === "None" || !d.candBriDistLt1}
          onClick={() => {
            set("candBriType", "None");
            set("candBriDistLt1", false);
          }}
          theme="orange"
        />
      </OptionGrid>

      <hr className="border-white/5 my-4" />
      <SectionLabel color="text-orange-400">
        Kehadiran UKO Peers (Bobot 20%)
      </SectionLabel>
      <div className="text-[11px] text-slate-400 mb-2 flex justify-between">
        <span>Jumlah Peers Bank dalam 2 km</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono text-slate-500">
          Bobot 20%
        </span>
      </div>
      <OptionGrid cols={2}>
        <OCard
          label="Terdapat Peers"
          sub="Ada kompetitor"
          score={100}
          selected={d.candPeersCount2km > 0}
          onClick={() => set("candPeersCount2km", 1)}
          theme="orange"
        />
        <OCard
          label="Tidak Ada Peers"
          sub="Bebas kompetitor"
          score={25}
          selected={d.candPeersCount2km === 0}
          onClick={() => set("candPeersCount2km", 0)}
          theme="orange"
        />
      </OptionGrid>

      <div className="text-[11px] text-slate-400 mb-2 flex justify-between">
        <span>Jarak Terhadap UKO Peers Terdekat</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-mono text-slate-500">
          Bobot 80%
        </span>
      </div>
      <OptionGrid cols={2}>
        <OCard
          label="< 1 km"
          sub="Sangat Dekat"
          score={100}
          selected={d.candPeersDistLt1}
          onClick={() => set("candPeersDistLt1", true)}
          theme="orange"
        />
        <OCard
          label="> 1 km"
          sub="Jarak Jauh"
          score={25}
          selected={!d.candPeersDistLt1}
          onClick={() => set("candPeersDistLt1", false)}
          theme="orange"
        />
      </OptionGrid>

      <hr className="border-white/5 my-4" />
      <SectionLabel color="text-orange-400">
        Potensi Wilayah Kandidat (Bobot 60%)
      </SectionLabel>
      <OptionGrid cols={4}>
        <OCard
          label="Star"
          sub="Sangat Tinggi"
          score={100}
          selected={d.candPotensi === "Star"}
          onClick={() => set("candPotensi", "Star")}
          theme="orange"
        />
        <OCard
          label="Growth"
          sub="Berkembang"
          score={75}
          selected={d.candPotensi === "Growth"}
          onClick={() => set("candPotensi", "Growth")}
          theme="orange"
        />
        <OCard
          label="Saturated"
          sub="Padat / Jenuh"
          score={50}
          selected={d.candPotensi === "Saturated"}
          onClick={() => set("candPotensi", "Saturated")}
          theme="orange"
        />
        <OCard
          label="Laggard"
          sub="Tertinggal"
          score={25}
          selected={d.candPotensi === "Laggard"}
          onClick={() => set("candPotensi", "Laggard")}
          theme="orange"
        />
      </OptionGrid>
    </div>
  );
}
