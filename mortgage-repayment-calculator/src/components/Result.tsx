type Props = {
  result: {
    monthlyPayment: number;
    totalPayment: number;
  } | null
}

const Result = ( {result} : Props) => {
  return (
    <div className={`w-full bg-slate-900 p-8 text-white md:rounded-r-3xl md:rounded-bl-[60px] md:flex md:flex-col ${
      !result  ? 'md:justify-center' : 'md:items-center'
    }`}>
      {!result ? (
        <div className="w-full flex flex-col items-center gap-3 justify-center text-center  ">
          <img src="/illustration-empty.svg" alt="calculator icon" />
          <h2 className="text-slate-100 text-lg font-bold mt-4">
            Results shown here
          </h2>
          <p className="text-slate-500">
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </div>
      ) : (
        <div className="w-full">
          <h2 className="text-2xl mb-4 font-bold">Your results</h2>
          <p className="text-slate-300 mb-6">
            Your results are shown below based on the information you provided. To
            adjust the results, edit the form and click “calculate repayments”
            again.
          </p>
          <div className="bg-black/20 p-6 rounded-lg border-t-4 border-lime">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <p className="text-slate-300 text-sm">Your monthly repayments</p>
                <p className="text-lime text-5xl font-bold">£{result.monthlyPayment}</p>
              </div>
              <hr className="border-slate-700" />
              <div className="flex flex-col gap-2">
                <p className="text-slate-300 text-sm">
                  Total you'll repay over the term
                </p>
                <p className="text-white text-2xl font-bold">£{result.totalPayment}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
