import React from "react";
import API from "../module/api";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { NavbarBrand, Navbar, Nav, NavItem } from "reactstrap"; 
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"; 
import { FaChevronDown } from "react-icons/fa";

const Logo = styled(NavbarBrand)`
	margin: auto 20px !important;
	font-style: italic !important;
	// font-size: 1.3em;
	font-weight: bold !important;
	color: #b5c9d4 !important;
`;

const UsernameNav = styled(NavLink)`
	margin: auto 20px !important;
	// font-style: italic !important;
	// font-size: 1.3em;
	font-weight: bold !important;
	color: #b5c9d4 !important;
`;

const StyledNavbar = styled(Navbar)`
	padding: 0 !important;
	background-color: #73777a;
`;

const StyledNavItem = styled(NavItem)`
	padding: .5rem 1rem;
`;
const StyledNavLink = styled(NavLink)`
	color: #ffffff !important;
	font-weight: bold;
	:hover {
		color: #b5c9d4 !important;
		text-decoration-line: none !important;
	}
`;

const StyledUncontrolledDropdown = styled(UncontrolledDropdown)`
	font-weight: bold;
	a {
		color: #ffffff !important;
	}
	a:hover {
		color: #b5c9d4 !important;
		text-decoration-line: none !important;
	}
`;

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}
	
	componentDidMount() {
		API.get(`/categories`)
			.then(res => {
				const categories = res.data

				this.setState({ categories });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		const categories = this.state.categories;

		const renderCategory = categories.map((category, index) => {
			return <DropdownItem key={index} value={category.name}>{category.name}</DropdownItem>
		});

		return (
			<StyledNavbar fixed="top">
				<Logo>Knowledge Base</Logo>
				<Nav style={{ marginRight: "auto" }}>
					<StyledNavItem>
						<StyledNavLink exact activeClassName="current" to="/">
							Home
						</StyledNavLink>
					</StyledNavItem>
					<StyledUncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							Category
						</DropdownToggle>
						<DropdownMenu right>
							{renderCategory}
						</DropdownMenu>
					</StyledUncontrolledDropdown>
					<StyledNavItem>
						<StyledNavLink exact activeClassName="current" to="/search">
							Search
						</StyledNavLink>
					</StyledNavItem>
				</Nav>

				<UsernameNav to="/signin" className="float-right">
					username <FaChevronDown />
				</UsernameNav>
			</StyledNavbar>
		);
	}
}

export default Navigation;
