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

export default function OutputDashboard({
  resultData,
  aiInsight,
  isLoadingAi,
  onBackToInput,
}) {
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
      <div className="bg-gradient-to-r from-[#060f24] to-[#10234a] border border-blue-900/40 rounded-3xl p-5 flex justify-between items-center gap-4 flex-wrap">
        <div>
          <div className="text-xs font-bold text-amber-400 tracking-widest uppercase flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            ONLINE
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

      <div className="bg-gradient-to-r from-[#0d1b3e] to-[#0b1426] border border-cyan-500/30 rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">✨</span>
          <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono">
            Gemini AI Executive Summary
          </span>
        </div>
        {isLoadingAi ? (
          <div className="flex items-center gap-3 py-2 text-xs text-slate-400">
            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            Generating dynamic spatial geo-intelligence insights...
          </div>
        ) : (
          <p className="text-slate-200 text-sm font-medium leading-relaxed italic m-0">
            {aiInsight || "Sistem siap memproses rangkuman eksekutif cerdas."}
          </p>
        )}
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
        className={`border rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-all duration-500 ${
          profitable
            ? "bg-gradient-to-br from-[#022019] via-[#071126] to-[#0b1426] border-emerald-500/30"
            : "bg-gradient-to-br from-[#250714] via-[#071126] to-[#0b1426] border-red-500/30"
        }`}
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
                    ? "Nihilnya konsentrasi internal jaringan kerja BRI dalam radius evaluasi 2 km memberikan kebebasan penuh bagi unit baru untuk melakukan penetrasi ekosistem pasar lokal tanpa risiko erosi pangsa pasar internal (zero internal market cannibalism)."
                    : "Titik lama mempertahankan stabilitas jangkauan pasar yang telah mapan, melindungi portofolio bisnis dari risiko volatilitas perputaran kas di lokasi baru."}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-amber-400">⚡</span> Market Capture &
                  Competitor Threat
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {profitable
                    ? "Akselerasi area kandidat ke dalam kluster kuadran potensial utama memposisikan unit kerja ini sebagai instrumen ofensif strategis guna merebut potensi dana pihak ketiga (DPK) maupun ekspansi kredit langsung pada titik blindspot peers bank kompetitor."
                    : "Tingkat penetrasi jaringan peers bank kompetitor di area kandidat dinilai terlalu jenuh dan tidak sebanding dengan proyeksi volume transaksi yang dapat diserap oleh struktur unit kerja saat ini."}
                </p>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-purple-400">💼</span> Cost-to-Income
                  Ratio (CIR) Risk Mitigation
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {profitable
                    ? "Merestrukturisasi alokasi aset operasional dari unit yang terjebak tren kinerja stagnan (Medium/Low Performance) ke wilayah dengan produktivitas tinggi merupakan langkah prudent untuk mengoptimalkan efisiensi rasio biaya operasional terhadap pendapatan."
                    : "Mencegah pembengkakan Capital Expenditure (CapEx) dari biaya pemindahan logistik jaringan kantor operasional yang berisiko memperburuk rasio efisiensi beban kerja administratif tahunan."}
                </p>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">📊</span> Channel Capacity
                  Optimization
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {profitable
                    ? "Mengubah fungsi simpul jaringan kantor dari sekadar pos pemeliharaan defensif (defensive node) menjadi mesin pertumbuhan bisnis aktif (growth engine node) yang terintegrasi penuh dengan peta jalan optimalisasi jaringan regional."
                    : "Mempertahankan titik lama dinilai jauh lebih menguntungkan karena ikatan ekosistem retail dan mikro lokal telah terbentuk secara solid serta memiliki biaya retensi nasabah yang rendah."}
                </p>
              </div>
            </div>
          </div>

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
