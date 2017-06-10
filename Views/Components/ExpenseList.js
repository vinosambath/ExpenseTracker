import React from 'react';
import {render} from 'react-dom';

export default class ExpenseList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			expenses: props.expenses,
			categories: props.categories,
			newExpense: {
				title: '',
				amount: '',
				categories: props.categories.length > 0 ? props.categories[0].name : [],
				notes:''
			}
		}

		this.reverseExpenseEdit = this.reverseExpenseEdit.bind(this);
		this.handleNewExpenseUpdate = this.handleNewExpenseUpdate.bind(this);
		this.saveNewExpense = this.saveNewExpense.bind(this);
		this.emptyNewExpense = this.emptyNewExpense.bind(this);
		this.validateInput = this.validateInput.bind(this);
	}

	handleNewExpenseUpdate(e) {
		var name = e.target.name;
		var value = e.target.value;
		var expense = this.state.newExpense;

		switch(name) {
			case "title":
				expense.title = value;
				break;
			case "amount":
				if(value >= '0' && value <= '9')
					expense.amount = value;
				break;
			case "category":
				expense.categories = []
				expense.categories.push(value);
				break;
			case "notes":
				expense.notes = value;
		}

		this.setState({ newExpense: expense });
	}

	reverseExpenseEdit() {
		this.props.reverseExpenseEdit();
	}

	validateInput() {
		if(this.state.newExpense.title.length > 0 && this.state.newExpense.amount.length > 0)
			return true;
		return false;
	}

	saveNewExpense() {
		if(!this.validateInput()) return;
		this.props.saveExpense(this.state.newExpense);
		this.emptyNewExpense();
	}

	emptyNewExpense() {
		var expense = this.state.newExpense;
		expense = {
			title: '',
			amount: '',
			categories: [],
			notes:''
		}

		this.setState({ newExpense: expense });
	}

	componentWillReceiveProps(props) {
		var expense = this.state.newExpense;
		if(this.props.categories.length > 0)
		{
			expense.categories = [];
			expense.categories.push(props.categories[0].name);
		}
		this.setState({ newExpense: expense });
	}

  render () {
    return (
    	<div style={{ float: 'left', width: '50%' }}>
				<div style={{ padding: '15px', 'text-align': 'center' }}>
					Expense List
					{
						!this.props.expenseEdit && this.props.categories.length > 0 && 
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
							Category: 
							<select value={this.state.newExpense.categories[0]} name="category" onChange={this.handleNewExpenseUpdate} > 
								{
									this.props.categories.map(function(category, index) {
										return (<option key={index}>{category.name}</option>)
									})
								}
							</select><br />
							Notes: <input type="text" name="notes" value={this.state.newExpense.notes} onChange={this.handleNewExpenseUpdate} /> <br />
							Save: <input type="button" onClick={this.saveNewExpense} />
						</div>
					)
					:
					(
						<span>
							{
								this.props.categories.length == 0 &&
									<div>Please add atleast one category in the right to proceed</div>
							}
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
						</span>
					)
				}
			</div>
    )
  }
}