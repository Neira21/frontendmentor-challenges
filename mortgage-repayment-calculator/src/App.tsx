import "./index.css";
import MortgageCalculator from "./components/MortgageCalculator";
import Result from "./components/Result";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type MortgageType = "Repayment" | "Interest Only" | null;

interface MortgageValues {
  mortgage: number | null;
  term: number | null;
  interest: number | null;
  mortgageType: MortgageType;
}

interface Result {
  monthlyPayment: number;
  totalPayment: number;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MortgageValues>({
    defaultValues: {
      mortgage: null,
      term: null,
      interest: null,
      mortgageType: null,
    },
    mode: 'onChange'
  });

  const [result, setResult] = useState<Result | null>(null);

  const onSubmit: SubmitHandler<MortgageValues> = (data) => {
    const { mortgage, term, interest, mortgageType } = data;
  
    if (mortgage === null || term === null || interest === null || mortgageType === null) {
      return;
    }
  
    const principal = mortgage;
    const monthlyInterestRate = interest / 100 / 12;
    const numberOfPayments = term * 12;
  
    let monthlyPayment = 0;
    let totalPayment = 0;
  
    if (mortgageType === "Repayment") {
      const rawMonthlyPayment =
        (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  
      const rawTotalPayment = rawMonthlyPayment * numberOfPayments;
  
      monthlyPayment = parseFloat(rawMonthlyPayment.toFixed(2));
      totalPayment = parseFloat(rawTotalPayment.toFixed(2));
    }
  
    if (mortgageType === "Interest Only") {
      const rawMonthlyPayment = principal * monthlyInterestRate;
      const rawTotalPayment = rawMonthlyPayment * numberOfPayments;
  
      monthlyPayment = parseFloat(rawMonthlyPayment.toFixed(2));
      totalPayment = parseFloat(rawTotalPayment.toFixed(2));
    }
    
    setResult({
      monthlyPayment: monthlyPayment,
      totalPayment: totalPayment
     });
  };

  const clearAll = () => {
    reset();
    setResult(null);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-[950px] flex flex-col md:flex-row">
        <MortgageCalculator
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          clearAll={clearAll}
        />
        <Result result={result} />
      </div>
    </main>
  );
}

export default App;
