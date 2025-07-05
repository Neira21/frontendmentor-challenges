import { useState } from 'react';

const MortgageCalculator = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="w-full bg-white p-8 md:w-1/2 md:rounded-l-3xl">
      <div className="flex flex-col gap-2 mb-6 md:flex-row md:justify-between">
        <h1 className="text-slate-900 text-2xl font-bold">
          Mortgage Calculator
        </h1>
        <a href="#" className="text-slate-700 text-sm underline">
          Clear All
        </a>
      </div>

      <form className="space-y-6">
        
        <div className="space-y-2">
          <label htmlFor="principal" className="text-slate-700 text-sm">
            Mortgage Amount
          </label>
          <div className="flex items-center border border-slate-500 rounded-md focus-within:border-lime">
            <span className={`text-slate-700 text-lg px-4 py-2 rounded-l-md ${focusedField === 'principal' ? 'bg-lime' : 'bg-slate-100'}`}>
              £
            </span>
            <input
              type="number"
              id="principal"
              className="w-full p-2 focus:outline-none peer"
              onFocus={() => setFocusedField('principal')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div className="md:flex md:gap-4 space-y-6 md:space-y-0">
          <div className="space-y-2 md:w-1/2">
            <label htmlFor="term" className="text-slate-700 text-sm">
              Mortgage Term
            </label>
            <div className="flex items-center border border-slate-500 rounded-md focus-within:border-lime">
              <input
                type="number"
                id="term"
                className="w-full p-2 focus:outline-none"
                onFocus={() => setFocusedField('term')}
                onBlur={() => setFocusedField(null)}
              />
              <span className={`text-slate-700 text-lg px-4 py-2 rounded-r-md ${focusedField === 'term' ? 'bg-lime' : 'bg-slate-100'}`}>
                years
              </span>
            </div>
          </div>

          <div className="space-y-2 md:w-1/2">
            <label htmlFor="interest" className="text-slate-700 text-sm">
              Interest Rate
            </label>
            <div className="flex items-center border border-slate-500 rounded-md focus-within:border-lime">
              <input
                type="number"
                id="interest"
                className="w-full p-2 focus:outline-none"
                onFocus={() => setFocusedField('interest')}
                onBlur={() => setFocusedField(null)}
              />
              <span className={`text-slate-700 text-lg px-4 py-2 rounded-r-md ${focusedField === 'interest' ? 'bg-lime' : 'bg-slate-100'}`}>
                %
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-slate-700 text-sm">Mortgage Type</label>
          <div className="space-y-2">

            <label
             htmlFor="repayment"
             className="flex items-center border border-slate-500 rounded-md p-3 has-[:checked]:bg-lime/20 has-[:checked]:border-lime">
              <input
                type="radio"
                id="repayment"
                name="mortgageType"
                value="repayment"
                className="mr-2 accent-lime"
              />
              <span className="text-slate-900 font-bold text-lg">
                Repayment
              </span>
            </label>
            
            <label 
            htmlFor="interestOnly"
            className="flex items-center border border-slate-500 rounded-md p-3 has-[:checked]:bg-lime/20 has-[:checked]:border-lime">
              <input
                type="radio"
                id="interestOnly"
                name="mortgageType"
                value="interestOnly"
                className="mr-2 accent-lime"
              />
              <span
                className="text-slate-900 font-bold text-lg"
              >
                Interest Only
              </span>
            </label>
          </div>
        </div>

        <button className="bg-lime flex items-center gap-2 w-full p-4 rounded-full font-bold justify-center text-slate-900 cursor-pointer">
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