import React from "react";
import styled from "styled-components";

const Content = styled.div`
   background-color: #F9F9F9;
	padding: 50px;
`;

class NewPost extends React.Component {
   constructor() {
      super();
      this.state = { post: "" };
   }

   render() {
      return (
         <Content>
            <h1>NewPost</h1>
         </Content>
      );
   }
}

export default NewPost;
