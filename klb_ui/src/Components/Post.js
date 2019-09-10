import React from 'react';
import axios from 'axios';
import styled from 'styled-components'

const Div = styled.div`
	margin-bottom: 20px
`

const Title = styled.h1`
	margin-bottom: 10px
`

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = { post: "" };
		
	}

	static getDerivedStateFromProps(props, state) {
		return { post: props.post || "" };
	}

	render() {
		console.log("state");
		console.log(this.state.post);
		return (
			<Div>
				<Title>{this.state.post.title}</Title>
				<p>{this.state.post.detail}</p>
			</Div>
		)
	}
}

export default Post