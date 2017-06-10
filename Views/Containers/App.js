import React from 'react';
import {render} from 'react-dom';
import CategoryList from '../Components/CategoryList';
import ExpenseList from '../Components/ExpenseList';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			expenses: [],
			categories: [],
			expenseEdit: false,
			categoryEdit: false
		}

		this.reverseExpenseEdit = this.reverseExpenseEdit.bind(this);
		this.reverseCategoryEdit = this.reverseCategoryEdit.bind(this);
		this.saveExpense = this.saveExpense.bind(this);
		this.saveCategory = this.saveCategory.bind(this);
	}

	saveExpense(expense) {
		$.ajax({
			url: 'http://localhost:3000/addExpense',
			type: "POST",
			data: expense,
			cache: 'false',
			datatype: 'json',
			success: function(data) {

			}.bind(this),
			error: function(data) {

			}.bind(this),
			complete: function(data) {
				var expEdit = this.state.expenseEdit;
				expEdit = !expEdit;
				this.setState({ expenseEdit: expEdit });
				this.getAllExpense();
			}.bind(this)
		});
	}

	saveCategory(category) {
		$.ajax({
			url: 'http://localhost:3000/addCategory',
			type: "POST",
			data: category,
			cache: 'false',
			datatype: 'json',
			success: function(data) {

			}.bind(this),
			error: function(data) {

			}.bind(this),
			complete: function(data) {
				var catEdit = this.state.categoryEdit;
				catEdit = !catEdit;
				this.setState({ categoryEdit: catEdit });
				this.getAllCategories();
			}.bind(this)
		});
	}

	getAllExpense() {
		$.ajax({
			url: 'http://localhost:3000/getAllExpense',
			type: "GET",
			cache: 'false',
			datatype: 'json',
			success: function(data) {
				this.setState({ expenses: data.data });
			}.bind(this),
			error: function(data) {

			}.bind(this)
		})
	}

	getAllCategories() {
		$.ajax({
			url: 'http://localhost:3000/getCategories',
			type: "GET",
			cache: 'false',
			datatype: 'json',
			success: function(data) {
				this.setState({ categories: data.data });
			}.bind(this),
			error: function(data) {

			}.bind(this)
		})
	}

	reverseExpenseEdit() {
		var expenseEditValue = this.state.expenseEdit;
		expenseEditValue = !expenseEditValue;
		this.setState({ expenseEdit: expenseEditValue });
	}

	reverseCategoryEdit() {
		var categoryEditValue = this.state.categoryEdit;
		categoryEditValue = !categoryEditValue;
		this.setState({ categoryEdit: categoryEditValue });
	}

	componentWillMount() {
		this.getAllExpense();
		this.getAllCategories();
	}

  render () {
    return (
    	<div style={{ width: '100%' }}>
			<div class="topbar" style={{ padding: '15px', 'text-align': 'center' }}>
				Expense Tracker
			</div>
			<div class="bottom" style={{ 'margin-top': '25px', padding: '50px'}}>
				<ExpenseList 
					expenses={this.state.expenses}
					expenseEdit={this.state.expenseEdit}
					reverseExpenseEdit={this.reverseExpenseEdit}
					saveExpense={this.saveExpense}
					categories={this.state.categories} />
				<CategoryList 
					categories={this.state.categories}
					categoryEdit={this.state.categoryEdit}
					reverseCategoryEdit={this.reverseCategoryEdit}
					saveCategory={this.saveCategory} />
			</div>
		</div>
    )
  }
}

render(<App />, document.getElementById('app'));