import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";

const StyleUl = styled.ul`
	background-color: #73777A
	font-weight: bold;
`;

const Logo = styled.p`
	margin: auto 20px;
	font-style: italic;
	font-size: 1.3em;
	color: #B5C9D4
`;

class Navigation extends React.Component {
	render() {
		return (
			<nav>
				<StyleUl className="m-0">
					<Logo>Knowledge Base</Logo>
					<li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
					<li><NavLink exact activeClassName="current" to='/allpost'>All Post</NavLink></li>
					<li><NavLink exact activeClassName="current" to='/newpost'>New Post</NavLink></li>

					<li><NavLink exact activeClassName="current" to='/signin'>Sign In</NavLink></li>
				</StyleUl>
			</nav>
		)
	}
}

export default Navigation