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
// import { FaChevronDown } from "react-icons/fa";

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

const StyledDropdownToggle = styled(DropdownToggle)`
   color: #ffffff;
   font-weight: bold;
   :hover {
      color: #b5c9d4;
   }
`;

const StyledDropdownItem = styled(DropdownItem)`
   color: #73777a !important;
`;

const BtnSignIn = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
   font-size: 0.8rem !important;
   font-weight: bold !important;
   margin-right: 20px;
   padding: 5px 10px !important;
   :hover {
      background-color: #f5692c !important;
   }
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

const getUserNow = () => {
   if (!config.headers.jwt) {
      delete config.headers.jwt;
   }

   return API.get(`/users/signedIn`, config)
      .then(res => {
         const userNow = {};

         if (res) {
            userNow.username = res.data[0].username;
            userNow.role = res.data[0].role;
         }

         return { userNow };
      })
      .catch(err => {
         console.log(err.message);
         console.error(err);
      });
};

class Navigation extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         userNow: "",
         categories: []
      };
   }

   componentDidMount() {
      Promise.all([getCategory(), getUserNow()]).then(values => {
         const props = {};
         for (let i = 0; i < values.length; i++) {
            const key = values[i] ? Object.keys(values[i])[0] : null;
            const val = values[i] ? Object.values(values[i])[0] : null;
            props[key] = val;
         }
         this.setState(props);
      });
   }

   signOut = () => {
      var delJwt = new Promise((resolve, reject) => {
         resolve(localStorage.clear());
      });

      delJwt.then(() => {
         window.location.reload();
      });
   };

   render() {
      const { categories, userNow } = this.state;

      const renderCategory = categories.map((category, index) => {
         return (
            <StyledDropdownItem
               key={index}
               href={`/search/title=&category=${category.name}&fromUser=&fromDate=&toDate=`}
            >
               {category.name}
            </StyledDropdownItem>
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
               <UncontrolledDropdown nav inNavbar>
                  <StyledDropdownToggle nav caret>
                     Category
                  </StyledDropdownToggle>
                  <DropdownMenu right>{renderCategory}</DropdownMenu>
               </UncontrolledDropdown>
               <StyledNavItem>
                  <StyledNavLink exact activeClassName="current" to="/search">
                     Search
                  </StyledNavLink>
               </StyledNavItem>
               {userNow.role === "admin" && (
                  <StyledNavItem>
                     <StyledNavLink
                        exact
                        activeClassName="current"
                        to="/report"
                     >
                        Reported Post
                     </StyledNavLink>
                  </StyledNavItem>
               )}
            </Nav>

            {config.headers.jwt ? (
               <Nav>
                  <UncontrolledDropdown nav inNavbar>
                     <StyledDropdownToggle nav caret>
                        {userNow.username}
                     </StyledDropdownToggle>
                     <DropdownMenu right>
                        <StyledDropdownItem href="/profile">
                           Profile
                        </StyledDropdownItem>
                        <DropdownItem divider />
                        <StyledDropdownItem onClick={this.signOut}>
                           Sign out
                        </StyledDropdownItem>
                     </DropdownMenu>
                  </UncontrolledDropdown>
               </Nav>
            ) : (
               <BtnSignIn href="/signin">Sign In</BtnSignIn>
            )}
         </StyledNavbar>
      );
   }
}

export default Navigation;
