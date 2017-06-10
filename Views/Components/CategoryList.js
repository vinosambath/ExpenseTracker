import React from 'react';
import {render} from 'react-dom';

export default class CategoryList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			categories: props.categories,
			newCategory: {
				name: '',
				description: ''
			}
		}

		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.saveNewCategory = this.saveNewCategory.bind(this);
		this.emptyNewCategory = this.emptyNewCategory.bind(this);
	}

	handleCategoryChange(e) {
		var name = e.target.name;
		var value = e.target.value;
		var category = this.state.newCategory;

		switch(name) {
			case "name":
				category.name = value;
				break;
			case "description":
				category.description = value;
				break;
		}

		this.setState({ newCategory: category });
	}

	saveNewCategory() {
		this.props.saveCategory(this.state.newCategory);
		this.emptyNewCategory();
	}

	emptyNewCategory() {
		var category = this.state.newCategory;
		category = {
			name: '',
			description: ''
		}

		this.setState({ newCategory: category });
	}

  render () {
    return (
    	<div style={{ float: 'left', width: '50%' }}>
				<div style={{ float:'top', height:'50%' }}>
					<div style={{ padding: '15px', 'text-align': 'center' }}>
						Categories List
						{
							!this.props.categoryEdit &&
							(
								<span className="glyphicon glyphicon-plus" style={{ 'padding-left': '15px' }} onClick={this.props.reverseCategoryEdit} >
								</span>
							)
						}
					</div>
					{
						this.props.categoryEdit?
						(
							<div>
								Name: <input type="text" name="name" value={this.state.newCategory.name} onChange={this.handleCategoryChange} /> <br />
								Description: <input type="text" name="description" value={this.state.newCategory.description} onChange={this.handleCategoryChange} /> <br />
								Save: <input type="button" onClick={this.saveNewCategory} />
							</div>
						)
						:
						(
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
						)
					}
					
				</div>
			</div>
    )
  }
}