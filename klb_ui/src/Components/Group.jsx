import React from "react";
import styled from "styled-components";
import Post from "./Post.jsx";

const Div = styled.div`
   margin-top: 50px;
`;

class Group extends React.Component {
   constructor(props) {
      super(props);
      this.state = { post: [] };
   }

   static getDerivedStateFromProps(props, state) {
      return { post: props.post || [] };
   }

   render() {
      console.log("state");
      console.log(this.state.post);
      return (
         <Div>
            {this.state.post.map(post => (
               <Post key={post._id} post={post} />
            ))}
         </Div>
      );
   }
}

export default Group;
