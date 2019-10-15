import React from "react";
import styled from "styled-components";

import { PaginationItem, PaginationLink } from 'reactstrap';

class PaginationButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = { pageNumbers: [], currentPage: 1 }
	}

	
	render() {
		const StyledItem = styled(PaginationItem)`
         padding: 0;
      `
      
		const StyledLink = styled(PaginationLink)`
			box-shadow: none !important
      `
      
      const number = this.props.number
      const activeColor = {}

      if(number === this.props.currentPage) {
         activeColor.backgroundColor = "#e9ecef"
			// activeColor.color = "#ffffff"
      }

		return (
			<StyledItem>
				<StyledLink style={activeColor} key={number} id={number} onClick={this.props.handleClick}>
					{number}
 				</StyledLink> 
			</StyledItem>
		)
	}
}

export default PaginationButton