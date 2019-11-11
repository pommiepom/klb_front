import React from "react";
import API from "../module/api";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { NavbarBrand, Navbar, Nav, NavItem, Button } from "reactstrap";
import {
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem
} from "reactstrap";
import { FaChevronDown } from "react-icons/fa";

const Logo = styled(NavbarBrand)`
   margin: auto 20px !important;
   font-style: italic !important;
   // font-size: 1.3em;
   font-weight: bold !important;
   color: #b5c9d4 !important;
`;

const StyledNavbar = styled(Navbar)`
   padding: 0 !important;
   background-color: #73777a;
`;

const StyledNavItem = styled(NavItem)`
   padding: 0.5rem 1rem;
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
      color: #ffffff;
   }
   a:hover {
      color: #b5c9d4 !important;
      text-decoration-line: none !important;
   }
`;

const StyledDropdownItem = styled(DropdownItem)`
   a {
      color: #73777a !important;
   }
`;

const BtnSignIn = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
   font-size: 0.8rem !important;
   font-weight: bold !important;
   margin-right: 20px;
   padding: 5px 10px !important;
`;

const config = {
   headers: {
      jwt: localStorage.getItem("jwt")
   }
};

const getCategory = () => {
   return API.get(`/categories`)
      .then(res => {
         const categories = res.data;
         return { categories };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

const getUsername = () => {
   return API.get(`/users/signedIn`, config)
      .then(res => {
         const username = res.data[0].username;

         return { username };
      })
      .catch(err => {
         console.error(err);
      });
};

class Navigation extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         categories: []
      };
   }

   componentDidMount() {
      Promise.all([getCategory(), getUsername()]).then(values => {
         const props = {};

         for (let i = 0; i < values.length; i++) {
            const key = values[i] ? Object.keys(values[i])[0] : null;
            const val = values[i] ? Object.values(values[i])[0] : null;
            props[key] = val;
         }

         this.setState(props);
      });
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevState.username !== this.state.username) {
         Promise.all([getCategory(), getUsername()]).then(values => {
            const props = {};

            for (let i = 0; i < values.length; i++) {
               const key = values[i] ? Object.keys(values[i])[0] : null;
               const val = values[i] ? Object.values(values[i])[0] : null;
               props[key] = val;
            }

            this.setState(props);
         });
      }
   }

   render() {
      const { categories, username } = this.state;

      const renderCategory = categories.map((category, index) => {
         return (
            <DropdownItem key={index} value={category.name}>
               {category.name}
            </DropdownItem>
         );
      });

      return (
         <StyledNavbar fixed="top">
            <Logo>Knowledge Base</Logo>
            <Nav style={{ marginRight: "auto" }}>
               <StyledNavItem>
                  <StyledNavLink exact activeClassName="current" to="/page/1">
                     Home
                  </StyledNavLink>
               </StyledNavItem>
               <StyledUncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                     Category
                  </DropdownToggle>
                  <DropdownMenu right>{renderCategory}</DropdownMenu>
               </StyledUncontrolledDropdown>
               <StyledNavItem>
                  <StyledNavLink exact activeClassName="current" to="/search">
                     Search
                  </StyledNavLink>
               </StyledNavItem>
            </Nav>

            {config.headers.jwt ? (
               <Nav>
                  <StyledUncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav caret>
                        {username}
                     </DropdownToggle>
                     <DropdownMenu right>
                        <StyledDropdownItem href="/profile">
                           Profile
                        </StyledDropdownItem>
                        <DropdownItem divider />
                        <StyledDropdownItem>Log out</StyledDropdownItem>
                     </DropdownMenu>
                  </StyledUncontrolledDropdown>
               </Nav>
            ) : (
               <BtnSignIn href="/signin">Sign In</BtnSignIn>
            )}

         </StyledNavbar>
      );
   }
}

export default Navigation;
