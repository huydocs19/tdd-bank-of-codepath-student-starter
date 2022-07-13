import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [transactions, setTransactions] = React.useState([])
  const [transfers, setTransfers] = React.useState([])
  const [error, setError] = React.useState("")
  const [filterInputValue, setFilterInputValue] = React.useState("")
  const [newTransactionForm, setNewTransactionForm] = React.useState({
    category: "",
    description: "",
    amount: 0
  })
  const [isCreating, setIsCreating] = React.useState(false)
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}/>
        <main>          
          <Routes>
            <Route path="/" element={<Home isCreating={isCreating} setIsCreating={setIsCreating} newTransactionForm={newTransactionForm} setNewTransactionForm={setNewTransactionForm} transfers={transfers} setTransfers={setTransfers} transactions={transactions} setTransactions={setTransactions} error={error} setError={setError} filterInputValue={filterInputValue} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
            <Route path="/transactions/:transactionId" element={<TransactionDetail />}/>
          </Routes>
        </main>
      </BrowserRouter>
      
      
    </div>
  )
}
