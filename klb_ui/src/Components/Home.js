import React from 'react';
import Post from './Post';
import Group from './Group';
import axios from 'axios';

class Home extends React.Component {
	constructor() {
		super();
		this.state = { post: "" };
		axios.get(`http://localhost:8001/api/posts`)
			.then(res => {
				const post = res.data
				this.setState({ post })
				console.log(this.state);
			})
	}

	// componentDidMount() {
	// 	axios.get(`http://localhost:8001/api/posts`)
	// 		.then(res => {
	// 			const post = res.data
	// 			this.setState({ post })
	// 		})
	// }

	render() {
		// console.log(this.state.post[0]);
		// console.log("aroooooo");
		return (
			<div className='home'>
				<Post post={ this.state.post[0] }/>
				{/* <Post post={ {title: "Title!!!" }}/> */}
				{/* <Group post_id={ this.state.post }/> */}
			</div>
		)
	}
}

export default Home