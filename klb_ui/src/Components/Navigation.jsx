import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";

const StyleUl = styled.ul`
	background-color: #6c757d
`;


class Navigation extends React.Component {
	render() {
		return (
			<nav>
				<StyleUl className="m-0">
					<li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
					<li><NavLink exact activeClassName="current" to='/about'>About</NavLink></li>
					<li><NavLink exact activeClassName="current" to='/contact'>Contact</NavLink></li>
					<li><NavLink exact activeClassName="current" to='/allpost'>All Post</NavLink></li>
				</StyleUl>
			</nav>
		)
	}
}

export default Navigation