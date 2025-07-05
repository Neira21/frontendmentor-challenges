import "./index.css";
import MortgageCalculator from "./components/MortgageCalculator";
import Result from "./components/Result";
import { useState } from "react";

/*eslint-disable */

function App() {
  const [mortgage, setMortgage] = useState("");
  const [term, setTerm] = useState("");
  const [interest, setInterest] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [result, setResult] = useState("");

  const clearAll = () => {
    setMortgage("");
    setTerm("");
    setInterest("");
    setMortgageType("");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100">
      <div className="w-full max-w-[950px] flex flex-col shadow-lg md:flex-row">
        <MortgageCalculator />
        <Result />
      </div>
    </main>
  );
}

export default App;
