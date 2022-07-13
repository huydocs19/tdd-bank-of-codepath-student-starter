import * as React from "react"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"
import {useParams} from "react-router-dom"
import axios from "axios"

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = React.useState(false)
  const [transaction, setTransaction] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const {transactionId} = useParams()
  React.useEffect(() => {
    const fetchTransactionById = async () => {      
      if (transactionId) {
        setIsLoading(true)
        setHasFetched(false)
        axios.get(`http://localhost:3001/bank/transactions/${transactionId}`)
        .then(function (response) {
          const transaction = response?.data?.transaction        
          if (transaction) {
            setTransaction(transaction)   
          } else {
            setError("Not Found")
          }
          setIsLoading(false)
          setHasFetched(true)

          }).catch(function (error) {
            setError("Not Found")
            setIsLoading(false)
            setHasFetched(true)
          })
      } else {
        setError("Not found")
        setIsLoading(false)
        setHasFetched(true)
      }  
      
    }
    fetchTransactionById()
  }, [])
  return (
    <div className="transaction-detail">
      <TransactionCard error={error} transaction={transaction} transactionId={transactionId}/>
    </div>
  )
}

export function TransactionCard({ transaction = {}, transactionId = null, error="" }) {
  return (
    <div className="transaction-card card">

      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        {error && <h1>{error}</h1>}
        {transaction?.category && <p className="category">{transaction.category}</p>}
      </div>

      <div className="card-content">
      {transaction?.description && <p className="description">{transaction.description}</p>}
      </div>

      <div className="card-footer">
      {transaction?.amount && <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>}
        {transaction?.postedAt && <p className="date">{formatDate(transaction.postedAt)}</p>}
      </div>      
      
    </div>
  )
}
