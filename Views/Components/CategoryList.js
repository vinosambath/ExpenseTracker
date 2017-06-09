import React from 'react';
import {render} from 'react-dom';

export default class CategoryList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			categories: props.categories
		}
	}
  render () {
    return (
    	<div style={{ float: 'left', width: '50%' }}>
				<div style={{ float:'top', height:'50%' }}>
					<div style={{ padding: '15px', 'text-align': 'center' }}>
						Categories List
						<span className="glyphicon glyphicon-plus" style={{ 'padding-left': '15px' }}>
						</span>
					</div>
					<table>
						<thead>
							<tr>
								<th>Category</th>
							</tr>
						</thead>
						<tbody>
							{
								this.props.categories.map(function(category, index) {
									return (
										<tr key={index}>
											<td>{ category.name }</td>
											<td>{ category.description }</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
    )
  }
}