import { useState } from 'react';
import type { UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';

type MortgageType = "Repayment" | "Interest Only" | null;

interface MortgageValues {
  mortgage: number | null;
  term: number | null;
  interest: number | null;
  mortgageType: MortgageType;
}

type Props = {
  register: UseFormRegister<MortgageValues>;
  handleSubmit: UseFormHandleSubmit<MortgageValues>;
  onSubmit: (data: MortgageValues) => void;
  errors: FieldErrors<MortgageValues>;
  clearAll: () => void;
};

const MortgageCalculator = ({register, handleSubmit, onSubmit, errors, clearAll} : Props) => {  
 
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="w-full bg-white p-8 md:rounded-l-3xl">
      <div className="flex flex-col gap-2 mb-6 md:flex-row md:justify-between">
        <h1 className="text-slate-900 text-2xl font-bold">
          Mortgage Calculator
        </h1>
        <button onClick={clearAll} className="text-slate-700 text-sm underline text-left">
          Clear All
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="space-y-2">
          <label htmlFor="principal" className="text-slate-700 text-sm block">
            Mortgage Amount
          </label>
          <div className={`flex items-center border rounded-md focus-within:border-lime ${errors.mortgage ? 'border-red-500' : 'border-slate-500'}`}>
            <span className={`text-lg px-4 py-2 rounded-l-md ${focusedField === 'principal' ? 'bg-lime' : 'bg-slate-100'} ${errors.mortgage ? 'bg-red-500 text-slate-700' : 'text-slate-700'}`}>
              £
            </span>
            <input
              type="number"
              id="principal"
              {...register("mortgage", { 
                valueAsNumber: true, 
                required: "This field is required",
                min: { value: 1, message: "Must be a positive number" }
              })}
              className="w-full p-2 focus:outline-none peer"
              onFocus={() => setFocusedField('principal')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
          {errors.mortgage && <p className="text-red-500 text-sm">{errors.mortgage.message}</p>}
        </div>

        <div className="md:flex md:gap-4 space-y-6 md:space-y-0">
          <div className="space-y-2 md:w-1/2">
            <label htmlFor="term" className="text-slate-700 text-sm block">
              Mortgage Term
            </label>
            <div className={`flex items-center border rounded-md focus-within:border-lime ${errors.term ? 'border-red-500' : 'border-slate-500'}`}>
              <input
                type="number"
                id="term"
                {...register("term", { 
                  valueAsNumber: true, 
                  required: "This field is required",
                  min: { value: 1, message: "Must be a positive number" }
                })}
                className="w-full p-2 focus:outline-none"
                onFocus={() => setFocusedField('term')}
                onBlur={() => setFocusedField(null)}
              />
              <span className={`text-lg px-4 py-2 rounded-r-md ${focusedField === 'term' ? 'bg-lime' : 'bg-slate-100'} ${errors.term ? 'bg-red-500 text-white' : 'text-slate-700'}`}>
                years
              </span>
            </div>
            {errors.term && <p className="text-red-500 text-sm">{errors.term.message}</p>}
          </div>

          <div className="space-y-2 md:w-1/2">
            <label htmlFor="interest" className="text-slate-700 text-sm block">
              Interest Rate
            </label>
            <div className={`flex items-center border rounded-md focus-within:border-lime ${errors.interest ? 'border-red-500' : 'border-slate-500'}`}>
              <input
                type="number"
                id="interest"
                step="any"
                {...register("interest", { 
                  valueAsNumber: true, 
                  required: "This field is required",
                  min: { value: 1, message: "Must be a positive number" }
                })}
                className="w-full p-2 focus:outline-none"
                onFocus={() => setFocusedField('interest')}
                onBlur={() => setFocusedField(null)}
              />
              <span className={`text-lg px-4 py-2 rounded-r-md ${focusedField === 'interest' ? 'bg-lime' : 'bg-slate-100'} ${errors.interest ? 'bg-red-500 text-white' : 'text-slate-700'}`}>
                %
              </span>
            </div>
            {errors.interest && <p className="text-red-500 text-sm">{errors.interest.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-slate-700">Mortgage Type</p>
          <div className="space-y-2">

            <label
             htmlFor="repayment"
             className="flex items-center border border-slate-500 rounded-md p-3 has-[:checked]:bg-lime/20 has-[:checked]:border-lime">
              <input
                className="mr-2 accent-lime"
                type="radio"
                id="repayment"
                value="Repayment"
                {...register("mortgageType", { required: "This field is required" })}
              />
              <span className="text-slate-900 font-bold text-lg">
                Repayment
              </span>
            </label>
            
            <label 
            htmlFor="interestOnly"
            className="flex items-center border border-slate-500 rounded-md p-3 has-[:checked]:bg-lime/20 has-[:checked]:border-lime">
              <input
                className="mr-2 accent-lime"
                type="radio"
                id="interestOnly"
                value="Interest Only"
                {...register("mortgageType", { required: "This field is required" })}
              />
              <span
                className="text-slate-900 font-bold text-lg"
              >
                Interest Only
              </span>
            </label>
          </div>
          {errors.mortgageType && <p className="text-red-500 text-sm">{errors.mortgageType.message}</p>}
        </div>

        <button type="submit" className="bg-lime flex items-center gap-2 w-full p-4 rounded-full font-bold justify-center text-slate-900 cursor-pointer disabled:opacity-50">
          <img
            src={"/icon-calculator.svg"}
            className="w-5 h-5"
            alt="calculator icon"
          />
          Calculate Repayments
        </button>
      </form>
    </div>
  );
};

export default MortgageCalculator;