import React from "react";

function Ring({ value, gradId, stops }) {
  const r = 52,
    circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(value, 100) / 100) * circ;
  return (
    <div className="relative flex-shrink-0 flex items-center justify-center">
      <svg width="120" height="120">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            {stops.map((s, i) => (
              <stop key={i} offset={s[0]} stopColor={s[1]} />
            ))}
          </linearGradient>
        </defs>
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
      </svg>
      <div className="absolute font-mono font-black text-2xl text-white">
        {Math.round(value)}
      </div>
    </div>
  );
}

export default function OutputDashboard({ resultData, onBackToInput }) {
  if (!resultData) return null;
  const {
    inputData: d,
    existResult: ex,
    candResult: ca,
    dsInsights: ds,
  } = resultData;

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
      <div className="relative rounded-3xl p-6 bg-[#0b1426]/60 border border-blue-500/20 shadow-2xl overflow-hidden mb-4 backdrop-blur-xl">
        <div className="absolute -top-24 -left-20 w-72 h-72 bg-[#003087]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-10 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-400 tracking-widest uppercase flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              BRI Relocations Analysis
            </div>
            <h1
              className="text-3xl font-extrabold m-0 p-0 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 font-sans"
              style={{
                letterSpacing: "-0.04em",
                textShadow: "0 2px 10px rgba(255,255,255,0.05)",
              }}
            >
              Relocation Network Optimizer
            </h1>
            <div className="text-xs text-blue-200 mt-1 font-medium opacity-90">
              by Channel Location Optimization Team
            </div>
          </div>
          <button
            onClick={onBackToInput}
            className="px-4 py-2.5 bg-[#112240] hover:bg-blue-900/60 text-blue-400 font-bold text-xs rounded-xl border border-blue-900/40 cursor-pointer transition uppercase tracking-wider"
          >
            ← Kembali & Ubah Data
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              Existing Location
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
              Candidate Location
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
            </div>
          </div>
        </div>
      </div>

      <div
        className={`border rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-all duration-500 ${profitable ? "bg-gradient-to-br from-[#022019] via-[#071126] to-[#0b1426] border-emerald-500/30" : "bg-gradient-to-br from-[#250714] via-[#071126] to-[#0b1426] border-red-500/30"}`}
      >
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
                Strategic Corporate Decision Analysis
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black text-white m-0 tracking-tight">
                {profitable
                  ? "REKOMENDASI STRATEGIS: EKSEKUSI RELOKASI JARINGAN KANTOR"
                  : "REKOMENDASI STRATEGIS: PERTAHANKAN UNIT OPERASIONAL EKSISTING"}
              </h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Evaluasi komparatif parameter spasial berbasis
                *geo-intelligence* mengonfirmasi bahwa penempatan jaringan pada
                lokasi kandidat{" "}
                <span className="text-orange-400 font-bold">
                  ({d.candName})
                </span>{" "}
                memiliki nilai keunggulan komposit bersih sebesar{" "}
                <span className="text-emerald-400 font-bold font-mono">
                  +{delta.toFixed(1)} poin
                </span>{" "}
                di atas kapasitas ruang lingkup operasional titik eksisting{" "}
                <span className="text-blue-400 font-bold">({d.existName})</span>
                .
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 text-xs border-t border-white/5">
              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-blue-400">🎯</span> Core Spatial Drivers
                  Analysis
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {profitable
                    ? "Nihilnya konsentrasi internal jaringan kerja BRI dalam radius evaluasi 2 km memberikan kebebasan penuh bagi unit baru untuk melakukan penetrasi ekosistem pasar lokal tanpa risiko erosi pangsa pasar internal."
                    : "Mitra lama mempertahankan jaringan area lama untuk proteksi penurunan loyalitas aset retail finansial."}
                </p>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-amber-400">⚡</span> Market Capture &
                  Competitor Threat
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {profitable
                    ? "Akselerasi area kandidat ke dalam kluster kuadran potensial utama memposisikan unit kerja ini sebagai instrumen ofensif strategis guna merebut potensi dana pihak ketiga langsung pada titik blindspot peers bank kompetitor."
                    : "Tingkat penetrasi kompetitor dinilai terlampau agresif di titik sasaran tanpa adanya gap penyerapan margin finansial baru."}
                </p>
              </div>
              <div className="space-y-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-purple-400">💼</span> Cost-to-Income
                  Ratio (CIR) Risk Mitigation
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {profitable
                    ? "Merestrukturisasi alokasi aset operasional dari unit yang terjebak tren kinerja stagnan ke wilayah dengan produktivitas tinggi merupakan langkah prudent untuk mengoptimalkan efisiensi rasio biaya operasional terhadap pendapatan."
                    : "Meminimalkan risiko lonjakan inefisiensi CapEx pemindahan infrastruktur jaringan sebelum indikator transaksi bernilai solid."}
                </p>
              </div>
              <div className="space-y-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">📊</span> Channel Capacity
                  Optimization
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {profitable
                    ? "Mengubah fungsi simpul jaringan kantor dari sekadar pos pemeliharaan defensif menjadi mesin pertumbuhan bisnis aktif yang terintegrasi penuh dengan peta jalan jika di-relokasi."
                    : "Mempertahankan unit eksisting lebih menjamin keamanan mitigasi likuiditas mikro lokal yang sudah mengakar kuat."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center min-w-[150px] self-center backdrop-blur-md shadow-inner">
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

      {ds && (
        <div className="bg-gradient-to-br from-[#0c1833] to-[#060e22] border border-blue-500/10 rounded-3xl p-5 shadow-inner">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3 font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
            Advanced Data Science Shadow Engine (No-Weight Override)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-[#070e1c] rounded-xl p-3 border border-white/5">
              <div className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">
                Spatial Cluster Density
              </div>
              <div className="text-white text-base font-mono font-bold mt-1">
                {ds.spatialDensityIndex}%
              </div>
              <div className="text-slate-400 text-[10px] mt-0.5">
                {ds.marketSaturationRisk}
              </div>
            </div>
            <div className="bg-[#070e1c] rounded-xl p-3 border border-white/5">
              <div className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">
                Model Confidence Interval
              </div>
              <div className="text-emerald-400 text-base font-mono font-bold mt-1">
                {ds.dataConfidenceInterval}%
              </div>
              <div className="text-slate-400 text-[10px] mt-0.5">
                Sigma Error Margin Safe
              </div>
            </div>
            <div className="bg-[#070e1c] rounded-xl p-3 border border-white/5">
              <div className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">
                Spatial Outlier Signal
              </div>
              <div
                className={`text-base font-mono font-bold mt-1 ${ds.isOutlier ? "text-rose-400" : "text-slate-400"}`}
              >
                {ds.isOutlier ? "⚠️ DETECTED" : "NORMAL"}
              </div>
              <div className="text-slate-400 text-[10px] mt-0.5">
                Distribution Discrepancy Test
              </div>
            </div>
          </div>

          <div className="bg-[#060c18] rounded-xl p-3 border border-cyan-500/10 text-xs text-slate-300 leading-relaxed font-sans">
            <span className="font-bold text-cyan-400">
              Algorithmic Predictive Review:{" "}
            </span>
            {ds.algorithmicVerdict}
          </div>
        </div>
      )}

      <div className="bg-[#0b1426] border border-blue-900/20 rounded-3xl p-5 shadow-md">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
          Perbandingan Nilai Kelompok Parameter Matriks
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {breakdown.map((item, i) => (
            <div
              key={i}
              className="bg-[#060d1a] border border-white/5 rounded-xl p-3"
            >
              <div className="text-[10px] text-slate-500 mb-1 truncate">
                {item.name}
              </div>
              <div className="flex justify-between text-[11px] font-mono mb-2">
                <span className="text-blue-400">E: {Math.round(item.ev)}</span>
                {item.cv !== null && (
                  <span className="text-orange-400">
                    C: {Math.round(item.cv)}
                  </span>
                )}
              </div>
              <div className="flex gap-1 items-end h-8">
                <div
                  className="flex-1 rounded-t bg-blue-500/30 flex items-end justify-center"
                  style={{ height: `${Math.max(4, (item.ev / 100) * 32)}px` }}
                >
                  <span className="text-[8px] text-blue-400 font-mono">
                    {Math.round(item.ev)}
                  </span>
                </div>
                {item.cv !== null && (
                  <div
                    className="flex-1 rounded-t bg-orange-500/30 flex items-end justify-center"
                    style={{ height: `${Math.max(4, (item.cv / 100) * 32)}px` }}
                  >
                    <span className="text-[8px] text-orange-400 font-mono">
                      {Math.round(item.cv)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
