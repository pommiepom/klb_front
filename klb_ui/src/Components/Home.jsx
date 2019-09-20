import React from "react";
import axios from "axios";
import Post from "./Post.jsx";
import Group from "./Group.jsx";

class Home extends React.Component {
   constructor() {
      super();
      this.state = { post: "" };
   }

   componentDidMount() {
      axios.get(`http://localhost:8001/api/posts`).then(res => {
         const post = res.data;
         this.setState({ post: post });
      });
   }

   render() {
      return (
         <div className="home">
            <Post post={this.state.post[0]} />
            <Group post={this.state.post} />
         </div>
      );
   }
}

export default Home;
