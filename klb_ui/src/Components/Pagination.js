import React from "react";

class Pagination extends React.Component {
	constructor(props) {
		super(props)
		this.state = { pageNumbers: [], currentPage: 1 }
		// this.handleClick = this.handleClick.bind(this)
	}

	
	render() {
		const number = this.props.number
		return (
			<li key={number} id={number} onClick={this.props.handleClick}>
				{number}
       	 	</li>
		)
	}
}

export default Pagination