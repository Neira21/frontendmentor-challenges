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
    <div className="flex justify-center items-center h-screen max-w-[1000px] mx-auto">
      <div className="flex flex-col items-center justify-center h-min-screen md:flex-row   my-auto">
        <MortgageCalculator />
        <Result />
      </div>
    </div>
  );
}

export default App;
