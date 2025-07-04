const MortgageCalculator = () => {
  return (
    <div className="w-full p-4 border border-slate-300 rounded-lg">
      <h1 className="text-slate-900 text-2xl font-bold">Mortgage Calculator</h1>

      <p className="text-slate-700 text-sm">Clear All</p>

      <form>
        <div>
          <label htmlFor="principal">Mortgage Amount</label>
          
          <div className="flex items-center gap-2 border border-slate-300 rounded-md p-2">
            <span className="text-slate-500 text-sm block  ">
              $
            </span>
            <input 
              type="number" 
              id="principal" 
              className="w-full p-2 border "
            />

          </div>
          
        </div>
        <div>
          <label htmlFor="interest">Mortgage Term</label>
          <input type="number" id="interest" />
        </div>
        <div>
          <label htmlFor="term">Interest Rate</label>
          <input type="number" id="term" />
        </div>

        <div>
          <div>
            <input type="radio" value="Repayment" />
            <label htmlFor="repayment">Mortgage Type</label>
          </div>
          <div>
            <input type="radio" id="repayment" />
            <label htmlFor="repayment">Interest Only</label>
          </div>
        </div>
        <button className="bg-lime flex items-center gap-2 w-full p-3 rounded-2xl font-bold justify-center"> 
          <span>
            <img src={"/icon-calculator.svg"} className="w-6 h-6" alt="" />
          </span>
          Calculate Repayments
          </button>
      </form>
    </div>
  );
};

export default MortgageCalculator;
