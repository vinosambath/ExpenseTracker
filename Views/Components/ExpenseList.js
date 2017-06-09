import React from 'react';
import {render} from 'react-dom';

export default class ExpenseList extends React.Component {
  render () {
    return (
    	<div style={{ float: 'left', width: '50%' }}>
				<div style={{ padding: '15px', 'text-align': 'center' }}>
					Expense List
				</div>
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
						<tr>
							<td>Food</td>
							<td>Category 1, Category 2</td>
							<td>500</td>
							<td>Notes field for our expense</td>
						</tr>
					</tbody>
				</table>
			</div>
    )
  }
}