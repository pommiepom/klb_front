import React from 'react';
import Post from './Post';
import Group from './Group';
import axios from 'axios';

class Home extends React.Component {
	constructor() {
		super();
		this.state = { post: "" };
		// axios.get(`http://localhost:8001/api/posts`)
		// 	.then(res => {
		// 		const post = res.data
		// 		this.setState({ post })
		// 		console.log(this.state);
		// 	})
	}

	componentDidMount() {
		axios.get(`http://localhost:8001/api/posts`)
			.then(res => {
				const post = res.data
				this.setState({ post: post })
			})
	}

	render() {
		return (
			<div className='home'>
				<Post post={ this.state.post[0] }/>
				<Group post={ this.state.post }/>
			</div>
		)
	}
}

export default Home