import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
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
   render() {
      return (
         <StyledNavbar fixed="top">
            <Logo>Knowledge Base</Logo>
            <Nav style={{ marginRight: "auto" }}>
               <StyledNavItem>
                  <StyledNavLink exact activeClassName="current" to="/">
                     Home
                  </StyledNavLink>
               </StyledNavItem>
               {/* <StyledNavItem>
                  <StyledNavLink exact activeClassName="current" to="/signin">
                     Sign In
                  </StyledNavLink>
               </StyledNavItem> */}
               <StyledUncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                     Category
                  </DropdownToggle>
                  <DropdownMenu right>
                     <DropdownItem>Option 1</DropdownItem>
                     <DropdownItem>Option 2</DropdownItem>
                     <DropdownItem divider />
                     <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
               </StyledUncontrolledDropdown>
            </Nav>
            <UsernameNav to="/signin" className="float-right">
               username <FaChevronDown />
            </UsernameNav>
         </StyledNavbar>
      );
   }
}

export default Navigation;
