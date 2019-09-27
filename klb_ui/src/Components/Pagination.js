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






// export default class Example extends React.Component {
// 	render() {
// 	  return (
// 		<Pagination aria-label="Page navigation example">
// 			<PaginationItem disabled>
// 				<PaginationLink first href="#" />
// 			</PaginationItem>
// 		  	<PaginationItem disabled>
// 				<PaginationLink previous href="#" />
// 		  	</PaginationItem>
			  
// 		  	<PaginationItem active>
// 				<PaginationLink href="#">
// 			  		1
// 				</PaginationLink>
// 		  	</PaginationItem>
// 			<PaginationItem>
// 				<PaginationLink href="#">
// 			  		2
// 				</PaginationLink>
// 		  	</PaginationItem>
		  
// 		  	<PaginationItem>
// 				<PaginationLink href="#">
// 			  		4
// 				</PaginationLink>
// 		  	</PaginationItem>
// 		  	<PaginationItem>
// 				<PaginationLink href="#">
// 			  		5
// 				</PaginationLink>
// 		  	</PaginationItem>

// 		  	<PaginationItem>
// 				<PaginationLink next href="#" />
// 		 	</PaginationItem>
// 			<PaginationItem>
// 				<PaginationLink last href="#" />
// 		  	</PaginationItem>
// 		</Pagination>
// 	  );
// 	}
//   }