import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import axios from "axios"
import "./Home.css"

export default function Home(props) {
  const filteredTransactions = () => {
    if (props.filterInputValue) {      
      return props.transactions.filter((item) => item.description.toLowerCase().includes(props.filterInputValue.toLowerCase()))
    } else {
      return props.transactions
    }
  }  
  const handleOnSubmitNewTransaction = () => {
    handleOnCreateTransaction()
  }
  const handleOnCreateTransaction = async () => {    
    props.setIsCreating(true)
    const addTransaction = async () => {
      axios.post('http://localhost:3001/bank/transactions', props.newTransactionForm)
        .then(function (response) { 
          const newTransaction = response?.data?.transaction                    
          if (newTransaction) {            
            props.setTransactions((transactions) => [...transactions, {...props.newTransactionForm, ...newTransaction}])
            props.setNewTransactionForm({
              category: "",
              description: "",
              amount: 0
            })
          } else {
            props.setError("Cannot Create Transaction")
          }
          props.setIsCreating(false)
        }).catch(function (error) {        
          props.setError("Cannot Create Transaction")
          props.setIsCreating(false)
        })
    }
    addTransaction()
    
  }

  React.useEffect(() => {    
    const fetchTransactions = async () => {
      props.setIsLoading(true)
      axios.get('http://localhost:3001/bank/transactions')
        .then(function (response) {
          const transactions = response?.data?.transactions          
          if (transactions) {
            props.setTransactions(transactions)   
          } else {
            props.setError("No transactions available")
          }          
      }).catch(function (error) {        
        props.setError("No transactions available")
      })
    }
    const fetchTransfers = async () => {
      props.setIsLoading(true)
      axios.get('http://localhost:3001/bank/transfers')
        .then(function (response) {
          const transfers = response?.data?.transfers
          if (transfers) {
            props.setTransfers(transfers)
          }  else {
            props.setError("No transfers available")
          }          
      }).catch(function (error) {        
        props.setError("No transfers available")
      })
    }
    fetchTransactions()
    fetchTransfers()
    props.setIsLoading(false)
  }, []);
  return (
    <div className="home">
      <AddTransaction handleOnSubmit={handleOnSubmitNewTransaction} setForm={props.setNewTransactionForm} form={props.newTransactionForm} isCreating={props.isCreating} setIsCreating={props.setIsCreating} />
      {props.error && <h2 className="error">{props.error}</h2>}
      {props.isLoading?<h1>Loading...</h1>:<BankActivity transfers={props.transfers} transactions={filteredTransactions()}/>}
    </div>
  )
}
