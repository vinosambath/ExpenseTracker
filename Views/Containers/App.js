import React from 'react';
import {render} from 'react-dom';
import CategoryList from '../Components/CategoryList';
import ExpenseList from '../Components/ExpenseList';

class App extends React.Component {

	getAllExpense() {
		alert("in");
		$.ajax({
			url: 'http://localhost:3000/getAllExpense',
			type: "GET",
			cache: 'false',
			datatype: 'json',
			success: function(data) {
				alert(data)
			}.bind(this),
			error: function(data) {
				alert(data)
				console.log(data);
			}.bind(this)
		})
	}

	getAllCategories() {

	}

	componentDidMount() {
		this.getAllExpense();
	}

  render () {
    return (
    	<div style={{ width: '100%' }}>
			<div class="topbar" style={{ padding: '15px', 'text-align': 'center' }}>
				Expense Tracker
			</div>
			<div class="bottom" style={{ 'margin-top': '25px', padding: '50px'}}>
				<ExpenseList />
				<CategoryList />
			</div>
		</div>
    )
  }
}

render(<App />, document.getElementById('app'));