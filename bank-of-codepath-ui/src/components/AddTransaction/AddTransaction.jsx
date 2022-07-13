import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {
  const handleOnFormFieldChange = (event) => {
    props.setForm({...props.form, [event.target.name]: event.target.value})
  }
  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm isCreating={props.isCreating} form={props.form} handleOnSubmit={props.handleOnSubmit} handleOnFormFieldChange={handleOnFormFieldChange}/>
    </div>
  )
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input type="text" name="description" placeholder="Enter a description..." value={props.form?.description || ""} onChange={(event) => props.handleOnFormFieldChange(event)}/>
        </div>
        <div className="field">
          <label>Category</label>
          <input type="text" name="category" placeholder="Enter a category..." value={props.form?.category || ""} onChange={(event) => props.handleOnFormFieldChange(event)}/>
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input type="number" name="amount" value={props.form?.amount || ""} onChange={(event) => props.handleOnFormFieldChange(event)}/>
        </div>

        <button className="btn add-transaction" type="submit" onClick={props.handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
