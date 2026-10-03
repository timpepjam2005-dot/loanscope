import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function App() {

  const [principal, setPrincipal] = useState(250000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [payment, setPayment] = useState(1600);

  const [result, setResult] = useState(null);

  const [error, setError] = useState(null);

  async function calculateLoan() {
    const response = await fetch("http://localhost:3000/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        principal: Number(principal),
        interestRate: Number(interestRate),
        payment: Number(payment)
      })
    });

    const data = await response.json();

    if(!response.ok) {
      setError(data.error);
      setResult(null);
      return
    }

    setResult(data);
  }

  return (
    <div className="container">
      <h1>LoanScope</h1>

      <h2>Loan Parameters</h2>

      <div className="card">
        <label>Starting Principal </label>

        <input
          type="number"
          value={principal}
          onChange={(event) => setPrincipal(event.target.value)}
        />

        <input
          type="range"
          min="1"
          max="100000000"
          value={principal}
          onChange={(event) => setPrincipal(event.target.value)}
        />
      </div>

      <div className="card">
        <label>Annual Interest Rate </label>

        <input
          type="number"
          value={interestRate}
          onChange={(event) => setInterestRate(event.target.value)}
        />

        <input
          type="range"
          min="0"
          max="40"
          step="0.1"
          value={interestRate}
          onChange={(event) => setInterestRate(event.target.value)}
        />
      </div>

      <div className="card">
        <label>Monthly Payment </label>

        <input
          type="number"
          value={payment}
          onChange={(event) => setPayment(event.target.value)}
        />

        <input
          type="range"
          min="1"
          max="1000000"
          value={payment}
          onChange={(event) => setPayment(event.target.value)}
        />
      </div>

      <div>
        <button onClick={calculateLoan}>
          Calculate Loan
        </button>
      </div>

      {error && (
        <p>
          {error}
        </p>
      )}

      <p>Principal: ${principal}</p>
      <p>Interest Rate: {interestRate}%</p>
      <p>Payment: ${payment}</p>

      {result && (
        <>
          <p>
            Total Interest: ${result.totalInterest.toFixed(2)}
          </p>

          <p>
            Number of Payments: {result.schedule.length}
          </p>
        </>
      )}

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Payment</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>

          {result && result.schedule.map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>

              <td>${row.payment.toFixed(2)}</td>

              <td>${row.principal.toFixed(2)}</td>

              <td>${row.interest.toFixed(2)}</td>

              <td>${row.balance.toFixed(2)}</td>

            </tr>
          ))}
        </tbody>
      </table>

      {result && (
        <>
          <div className="card">
            <h3>Payoff Date</h3>
            <p>...</p>
          </div>

          <div className="card">
            <h3>Loan Term</h3>
            <p>{result.schedule.length}</p>
          </div>

          <div className="card">
            <h3>Total Interest</h3>
            <p>${result.totalInterest.toFixed(2)}</p>
          </div>
        </>
      )}

      {result && (
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer width="100%" height={400}>
        
            <LineChart data={result.schedule}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="balance"
                stroke="#2563eb"
              />

            </LineChart>

          </ResponsiveContainer>
        </div>
      )}
    </div>
    
  )
}

export default App;