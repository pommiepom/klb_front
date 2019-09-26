import React from "react";
import API from "../../module/api";
import $ from "jquery";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { Button } from "reactstrap";
import Group from "../../components/Group.jsx";

const Content = styled.div`
   background-color: #f9f9f9;
   padding: 50px;
   color: #73777a;
`;

const Headline = styled.h1`
   font-weight: bold;
`;

const ButtonNewPost = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
   font-weight: bold !important;
   // margin-left: auto;
   // margin-right: auto;
   border-radius: 25px !important;
   padding-left: 15px !important;
   padding-right: 15px !important;
`;

class NewPost extends React.Component {
   constructor(props) {
      super(props);
      this.state = { post: "" };
   }

   componentDidMount() {
      API.get(`/posts`).then(res => {
         const post = res.data;
         this.setState({ post: post });
      });
   }

   render() {
      return (
         <Content>
            <Row>
               <Col xs={7} className="mx-auto my-0">
                  <Row>
                     <Col>
                        <Headline>Post</Headline>
                     </Col>
                     <Col>
                        <ButtonNewPost className="float-right">
                           New Post
                        </ButtonNewPost>
                     </Col>
                  </Row>
                  <Group post={this.state.post} />
               </Col>
            </Row>
         </Content>
      );
   }
}

export default NewPost;
