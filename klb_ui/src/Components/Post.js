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
		// console.log(props.post);
	}
	
	// componentDidMount() {
	// 	const post_id = "5d5f5324dea7e02670f42f8f"
	// 	axios.get(`http://localhost:8001/api/posts/${ post_id }`)
	// 	.then(res => {
	// 		const post = res.data[0]
	// 		this.setState({ post })
	// 	})
	// }

	// static getDerivedStateFromProps(props, state) {
	// 	console.log("state");
	// 	console.log(state.post);
	// 	console.log("props");
	// 	console.log(this.props.post);
	// 	return { post: props.post };
	//  }
	
	render() {
		// console.log(this.props.post)
		// console.log(this.state.post);
		// console.log(typeof(this.state.post));
			console.log("mooooooo");
			return (
				<Div>
					{/* <Title>{ this.state.post.title }</Title>
					<p>{ this.state.post.detail }</p> */}
					<p>{ this.state.post }</p>
				</Div>
			)
		
	};
}

export default Post