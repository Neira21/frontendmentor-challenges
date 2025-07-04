
import './index.css'
import MortgageCalculator from './components/MortgageCalculator'
import Result from './components/Result'

function App() {
  return(
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <MortgageCalculator />
      <Result />
      
    </div>
  )
}

export default App
