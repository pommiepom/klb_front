import React from "react";
import styled from "styled-components";

import { PaginationItem, PaginationLink } from 'reactstrap';

class PaginationButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = { pageNumbers: [], currentPage: 1 }
		// this.handleClick = this.handleClick.bind(this)
	}

	
	render() {
		const StyledItem = styled(PaginationItem)`
			padding: 0;
		`

		const number = this.props.number
		return (
			<StyledItem>
				<PaginationLink key={number} id={number} onClick={this.props.handleClick}>
					{number}
 				</PaginationLink> 
			</StyledItem>
			
		)
	}
}

export default PaginationButton