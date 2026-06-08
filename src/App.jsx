import React, { useState } from "react";
import InputForm from "./InputForm";
import OutputDashboard from "./OutputDashboard";

export default function App() {
  const [screen, setScreen] = useState("input");
  const [result, setResult] = useState(null);

  const handleDone = (payload) => {
    setResult(payload);
    setScreen("output");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      {screen === "input" ? (
        <InputForm onCalculationComplete={handleDone} />
      ) : (
        <OutputDashboard
          resultData={result}
          onBackToInput={() => setScreen("input")}
        />
      )}
    </div>
  );
}
