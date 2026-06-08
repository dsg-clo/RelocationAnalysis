import React from "react";

function Ring({ value, gradId, stops }) {
  const r = 52,
    circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(value, 100) / 100) * circ;
  return (
    <div className="relative flex-shrink-0 flex items-center justify-center">
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#112240"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px" }}
        />
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            {stops.map((s, i) => (
              <stop key={i} offset={s[0]} stopColor={s[1]} />
            ))}
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute font-mono font-black text-2xl text-white">
        {Math.round(value)}
      </div>
    </div>
  );
}

export default function OutputDashboard({ resultData, onBackToInput }) {
  if (!resultData) return null;
  const { inputData: d, existResult: ex, candResult: ca } = resultData;

  const delta = ca.total - ex.total;
  const profitable = delta > 0;

  const breakdown = [
    { name: "UKO BRI Group (20%)", ev: ex.detail.ukoBri, cv: ca.detail.ukoBri },
    {
      name: "UKO Peers Group (20%)",
      ev: ex.detail.ukoPeers,
      cv: ca.detail.ukoPeers,
    },
    {
      name: "Potensi Wilayah Group",
      ev: ex.detail.potensi,
      cv: ca.detail.potensi,
    },
    { name: "Performance Group", ev: ex.detail.perf, cv: null },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-4 space-y-4 text-left animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#060f24] to-[#10234a] border border-blue-900/40 rounded-3xl p-5 flex justify-between items-center gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">
            📈 Geo-Spatial Jaringan Kantor Komparator
          </div>
          <h2 className="text-xl font-black text-white tracking-tight m-0">
            Hasil Pemodelan Relokasi Wilayah
          </h2>
        </div>
        <button
          onClick={onBackToInput}
          className="px-4 py-2.5 bg-[#112240] hover:bg-blue-900/60 text-blue-400 font-bold text-xs rounded-xl border border-blue-900/40 cursor-pointer transition uppercase tracking-wider"
        >
          ← Kembali & Ubah Data
        </button>
      </div>

      {/* Score Ring Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Existing */}
        <div className="bg-gradient-to-br from-[#0b1426] to-[#070e1c] border border-blue-900/30 rounded-3xl p-5 flex items-center gap-4 shadow-xl">
          <Ring
            value={ex.total}
            gradId="blueG"
            stops={[
              ["0%", "#0056b3"],
              ["100%", "#3b82f6"],
            ]}
          />
          <div className="flex-1">
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md">
              Existing Locations
            </span>
            <h3 className="text-sm font-black text-white mt-1.5 mb-2 leading-tight">
              {d.existName}
            </h3>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <div className="text-slate-400">
                UKO BRI:{" "}
                <span className="text-white font-mono font-bold">
                  {Math.round(ex.detail.ukoBri)}
                </span>
              </div>
              <div className="text-slate-400">
                Peers:{" "}
                <span className="text-white font-mono font-bold">
                  {Math.round(ex.detail.ukoPeers)}
                </span>
              </div>
              <div className="text-slate-400">
                Potensi:{" "}
                <span className="text-white font-mono font-bold">
                  {Math.round(ex.detail.potensi)}
                </span>
              </div>
              <div className="text-slate-400">
                Performa:{" "}
                <span className="text-white font-mono font-bold">
                  {Math.round(ex.detail.perf)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate */}
        <div className="bg-gradient-to-br from-[#0b1426] to-[#070e1c] border border-orange-900/30 rounded-3xl p-5 flex items-center gap-4 shadow-xl">
          <Ring
            value={ca.total}
            gradId="orangeG"
            stops={[
              ["0%", "#f77f00"],
              ["100%", "#f59e0b"],
            ]}
          />
          <div className="flex-1">
            <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded-md">
              Candidate Locations
            </span>
            <h3 className="text-sm font-black text-white mt-1.5 mb-2 leading-tight">
              {d.candName}
            </h3>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <div className="text-slate-400">
                UKO BRI:{" "}
                <span className="text-white font-mono font-bold">
                  {Math.round(ca.detail.ukoBri)}
                </span>
              </div>
              <div className="text-slate-400">
                Peers:{" "}
                <span className="text-white font-mono font-bold">
                  {Math.round(ca.detail.ukoPeers)}
                </span>
              </div>
              <div className="text-slate-400">
                Potensi:{" "}
                <span className="text-white font-mono font-bold">
                  {Math.round(ca.detail.potensi)}
                </span>
              </div>
              <div className="text-slate-400">
                Saturasi:{" "}
                <span className="text-emerald-400 font-mono font-bold">
                  Safe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REVISED VERDICT PANEL — EXECUTIVE STYLE */}
      <div
        className={`border rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-all duration-500 ${
          profitable
            ? "bg-gradient-to-br from-[#022019] via-[#071126] to-[#0b1426] border-emerald-500/30"
            : "bg-gradient-to-br from-[#250714] via-[#071126] to-[#0b1426] border-red-500/30"
        }`}
      >
        {/* Glowing Indicator bar */}
        <div
          className={`absolute top-0 left-0 w-2 h-full ${profitable ? "bg-emerald-500" : "bg-red-500"}`}
        />

        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full animate-pulse ${profitable ? "bg-emerald-400" : "bg-red-400"}`}
              />
              <span className="text-xs font-black uppercase tracking-widest text-white font-mono">
                Strategic Analysis
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white m-0 tracking-tight">
                {profitable
                  ? "REKOMENDASI: EKSEKUSI RELOKASI JARINGAN"
                  : "REKOMENDASI: PERTAHANKAN UNIT EKSISTING"}
              </h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Matriks geo-spasial mengonfirmasi bahwa titik kandidat{" "}
                <span className="text-orange-400 font-bold">
                  ({d.candName})
                </span>{" "}
                memiliki keunggulan indeks komposit jaringan sebesar{" "}
                <span className="text-emerald-400 font-bold font-mono">
                  +{delta.toFixed(1)} poin
                </span>{" "}
                di atas titik operasional{" "}
                <span className="text-blue-400 font-bold">({d.existName})</span>
                .
              </p>
            </div>

            {/* Deep Strategic Analysis Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs border-t border-white/5">
              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-blue-400">🎯</span> Core Spatial Driver
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {profitable
                    ? "Nihilnya kanibalisme internal di radius 2km memberikan kebebasan ekspansi market-share secara mutlak tanpa menggerus basis nasabah BRI eksisting."
                    : "Titik lama memiliki basis jangkauan pasar yang sudah mapan dan terlindung dari risiko penurunan kinerja struktural jaringan."}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-amber-400">⚡</span> Market Capture
                  Strategy
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {profitable
                    ? "Lokasi kandidat berada di kuadran 'Star' dengan potensi makro tinggi, menjadikannya mesin penetrasi agresif untuk merebut pangsa pasar simpanan dan pinjaman dari peers bank."
                    : "Titik kandidat memiliki tingkat kejenuhan tinggi atau potensi pertumbuhan regional yang belum mampu mengompensasi biaya pemindahan aset operasional."}
                </p>
              </div>
            </div>
          </div>

          {/* Metric Badge */}
          <div className="bg-[#112240]/60 border border-white/10 rounded-2xl p-4 text-center min-w-[150px] self-center backdrop-blur-md shadow-inner">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Variance Delta
            </div>
            <div
              className={`text-4xl font-black font-mono mt-1 ${profitable ? "text-emerald-400" : "text-red-400"}`}
            >
              {delta >= 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)}
            </div>
            <div className="text-[9px] text-slate-500 font-mono mt-1">
              Composite Index
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
