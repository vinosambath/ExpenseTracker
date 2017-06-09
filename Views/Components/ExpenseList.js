import React from 'react';
import {render} from 'react-dom';

export default class ExpenseList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			expenses: props.expenses,
			newExpense: {
				title: '',
				amount: '',
				categories: props.categories.length > 0 ? props.categories[0] : [],
				notes:''
			}
		}

		console.log(this.state.newExpense)

		this.reverseExpenseEdit = this.reverseExpenseEdit.bind(this);
		this.handleNewExpenseUpdate = this.handleNewExpenseUpdate.bind(this);
		this.saveNewExpense = this.saveNewExpense.bind(this);
	}

	handleNewExpenseUpdate(e) {
		var name = e.target.name;
		var value = e.target.value;
		var expense = this.state.newExpense;
		console.log(expense)

		switch(name) {
			case "title":
				expense.title = value;
				break;
			case "amount":
				expense.amount = value;
				break;
			case "notes":
				expense.notes = value;
		}

		this.setState({ newExpense: expense });
	}

	reverseExpenseEdit() {
		this.props.reverseExpenseEdit();
	}

	componentWillReceiveProps(props) {

	}

	saveNewExpense() {
		this.props.saveExpense(this.state.newExpense);
		this.state.newExpense = {};
	}

  render () {
    return (
    	<div style={{ float: 'left', width: '50%' }}>
				<div style={{ padding: '15px', 'text-align': 'center' }}>
					Expense List
					{
						!this.props.expenseEdit && 
						(
							<span className="glyphicon glyphicon-plus" style={{ 'padding-left': '15px' }} onClick={this.reverseExpenseEdit}>
							</span>
						)
					}
				</div>

				{
					this.props.expenseEdit ?
					(
						<div>
							Title: <input type="text" name="title" value={this.state.newExpense.title} onChange={this.handleNewExpenseUpdate} /> <br />
							Amount: <input type="text" name="amount" value={this.state.newExpense.amount} onChange={this.handleNewExpenseUpdate} /> <br />
							Category: <select value={this.state.newExpense.categories[0]} name="category" onChange={this.handleNewExpenseUpdate} /> <br />
							Notes: <input type="text" name="notes" value={this.state.newExpense.notes} onChange={this.handleNewExpenseUpdate} /> <br />
							Save: <input type="button" onClick={this.saveNewExpense} />
						</div>
					)
					:
					(
						<table>
							<thead>
								<tr>
									<th>Title</th>
									<th>Category</th>
									<th>Amount</th>
									<th>Notes</th>
								</tr>
							</thead>
							<tbody>
								{
									this.props.expenses.map(function(expense, index) {
										return (
											<tr key={index}>
												<td> {expense.title} </td>
												<td>
												{
													expense.categories.map(function(category, index) {
														return (<span key={index}> {category} </span>)
													})
												}
												</td>
												<td> {expense.amount} </td>
												<td> {expense.notes} </td>
											</tr>
										)
									})
								}
								
							</tbody>
						</table>
					)
				}
			</div>
    )
  }
}