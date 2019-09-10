import React from 'react';
import Post from './Post';
import styled from 'styled-components'

const Div = styled.div`
	margin-top: 50px
`

class Group extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = { post: "" };
	//  }

	// componentDidMount() {
	// 	const post_id = "5d5f5324dea7e02670f42f8f"
	// 	axios.get(`http://localhost:8001/api/posts/${post_id}`)
	// 		.then(res => {
	// 			const post = res.data[0]
	// 			this.setState({ post })
	// 			console.log(this.state);
	// 		})
	// }
	
	render() {
		return (
			<Div>
                {/* { this.} */}
				<Post />
				<Post />
			</Div>
		)
	};
}

export default Group