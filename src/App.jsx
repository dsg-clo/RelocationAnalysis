import React, { useState, useRef } from "react";
import InputForm from "./InputForm";
import OutputDashboard from "./OutputDashboard";
import { GoogleGenAI } from "@google/genai";

export default function App() {
  const [screen, setScreen] = useState("input");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [aiInsight, setAiInsight] = useState("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const abortControllerRef = useRef(null);

  const fetchAiInsight = async (payload) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoadingAi(true);
    setAiInsight("");
    try {
      const apiKey = "x";
      const ai = new GoogleGenAI({ apiKey });
      const delta = payload.candResult.total - payload.existResult.total;

      const existScore = payload.existResult.total;
      let existStatus = "Tidak Layak Direlokasi";
      if (existScore >= 70) existStatus = "Layak Direlokasi";
      else if (existScore >= 50) existStatus = "Perlu Kajian Lanjutan";

      const candScore = payload.candResult.total;
      let candStatus = "Tidak Direkomendasikan";
      if (candScore >= 80) candStatus = "Layak Menjadi Candidate Location";
      else if (candScore >= 60) candStatus = "Perlu Kajian Lanjutan";

      const prompt = `Anda adalah seorang Senior Data Scientist dan Ahli Strategi Jaringan Kantor Bank. 
      Berikan analisis eksekutif singkat (maksimal 3 kalimat) mengenai rencana relokasi ini:
      - Nama Kantor Eksisting: ${payload.inputData.existName || "Eksisting"} (Skor: ${Math.round(existScore)}, Status Matriks: ${existStatus})
      - Nama Lokasi Kandidat: ${payload.inputData.candName || "Kandidat"} (Skor: ${Math.round(candScore)}, Status Matriks: ${candStatus})
      - Selisih Keunggulan Komposit Bersih (Delta): ${delta.toFixed(1)} poin
      - Kategori Potensi Wilayah Kandidat: ${payload.inputData.candPotensi}
      
      Berikan kesimpulan akhir apakah langkah pemindahan logistik operasional ini bernilai taktis tinggi atau berisiko tinggi bagi rasio efisiensi bank. Gunakan bahasa formal perbankan Indonesia yang lugas dan berbobot tanpa ada pengulangan kata prompt.`;

      const response = await ai.models.generateContent(
        {
          model: "gemini-2.5-flash",
          contents: prompt,
        },
        { signal: abortControllerRef.current.signal },
      );

      if (response && response.text) {
        setAiInsight(response.text);
      } else {
        setAiInsight("Gagal memuat analisis AI.");
      }
    } catch (e) {
      if (e.name !== "AbortError") {
        setAiInsight(
          "Server AI sedang sibuk (503). Silakan muat ulang beberapa saat lagi.",
        );
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setIsLoadingAi(false);
      }
    }
  };

  const handleDone = (payload) => {
    setResult(payload);
    fetchAiInsight(payload);

    setHistory((prevHistory) => {
      const isExist = prevHistory.some(
        (item) =>
          item.inputData.existName === payload.inputData.existName &&
          item.inputData.candName === payload.inputData.candName &&
          item.existResult.total === payload.existResult.total &&
          item.candResult.total === payload.candResult.total,
      );

      if (isExist) return prevHistory;

      return [
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          ...payload,
        },
        ...prevHistory,
      ];
    });

    setScreen("output");
  };

  const handleSelectHistory = (pastResult) => {
    setResult(pastResult);
    fetchAiInsight(pastResult);
    setScreen("output");
  };

  return (
    <div className="w-full min-h-screen bg-[#080c14] text-slate-200 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {screen === "input" ? (
          <div className="space-y-6">
            <InputForm onCalculationComplete={handleDone} />

            {history.length > 0 && (
              <div className="bg-[#0b1426]/70 border border-blue-900/40 rounded-3xl p-6 backdrop-blur-xl text-left animate-fadeIn">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-3 font-bold flex items-center gap-2">
                  <span>📜</span> Riwayat Simulasi Analisis (Session History)
                </div>
                <div className="space-y-2">
                  {history.map((item) => {
                    const isProfitable =
                      item.candResult.total > item.existResult.total;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectHistory(item)}
                        className="flex justify-between items-center bg-[#112240]/40 hover:bg-[#112240] border border-white/5 rounded-xl p-3 cursor-pointer transition"
                      >
                        <div className="truncate pr-4">
                          <div className="text-xs font-bold text-white truncate">
                            {item.inputData.existName} ➜{" "}
                            {item.inputData.candName}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            Waktu: {item.timestamp} | Skor E:{" "}
                            {Math.round(item.existResult.total)} vs C:{" "}
                            {Math.round(item.candResult.total)}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md flex-shrink-0 ${
                            isProfitable
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {isProfitable ? "RELOKASI" : "PERTAHANKAN"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <OutputDashboard
            resultData={result}
            aiInsight={aiInsight}
            isLoadingAi={isLoadingAi}
            onBackToInput={() => setScreen("input")}
          />
        )}
      </div>
    </div>
  );
}
