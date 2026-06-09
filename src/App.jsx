import React, { useState } from "react";
import InputForm from "./InputForm";
import OutputDashboard from "./OutputDashboard";

export default function App() {
  const [screen, setScreen] = useState("input");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleDone = (payload) => {
    setResult(payload);

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
            onBackToInput={() => setScreen("input")}
          />
        )}
      </div>
    </div>
  );
}
