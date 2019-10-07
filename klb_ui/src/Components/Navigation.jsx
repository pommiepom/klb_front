import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { NavbarBrand, Navbar, Nav, NavItem } from "reactstrap";
import { FaChevronDown } from 'react-icons/fa'

const Logo = styled(NavbarBrand)`
	margin: auto 20px !important;
	font-style: italic !important;
	// font-size: 1.3em;
	font-weight: bold !important;
	color: #B5C9D4 !important 
`;

const UsernameNav = styled(NavLink)`
	margin: auto 20px !important;
	// font-style: italic !important;
	// font-size: 1.3em;
	font-weight: bold !important;
	color: #B5C9D4 !important
`;

const StyledNavbar = styled(Navbar)`
	padding: 0 !important;
	background-color: #73777A
`

const StyledNavItem = styled(NavItem)`
	padding-left: 10px;
	padding-right: 10px;
`
const StyledNavLink = styled(NavLink)`
	color: #ffffff !important;
	font-weight: bold;
	:hover {
		color: #B5C9D4 !important;
		text-decoration-line: none !important
	}
`

class Navigation extends React.Component {
	render() {
		return (
			<StyledNavbar fixed="top">
				<Logo>Knowledge Base</Logo>
 				<Nav style={{marginRight: "auto"}}>
				  	<StyledNavItem>
				  		<StyledNavLink exact activeClassName="current" to='/'>Home</StyledNavLink>
				  	</StyledNavItem>
				  	<StyledNavItem>
					  <StyledNavLink exact activeClassName="current" to='/signin'>Sign In</StyledNavLink>
				  	</StyledNavItem>
				</Nav>
				<UsernameNav to="/signin" className="float-right">username <FaChevronDown /></UsernameNav>
			</StyledNavbar>
		)
	}
}

export default Navigation