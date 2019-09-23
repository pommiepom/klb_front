import React from "react";
import axios from "axios";
import Post from "../components/Post.jsx";
import Group from "../components/Group.jsx";
import styled from "styled-components";

const Content = styled.div`
   // background-color: #F9F9F9;
	padding: 50px;
`;

class AllPost extends React.Component {
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
         <Content>
            <Post post={this.state.post[0]} />
            <Group post={this.state.post} />
         </Content>
      );
   }
}

export default AllPost;
