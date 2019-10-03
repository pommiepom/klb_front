import React from "react";
import API from "../module/api";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { FiHeart } from 'react-icons/fi'
// import { FaCommentDots } from 'react-icons/fa'
import { GoCommentDiscussion } from 'react-icons/go'

const Div = styled.div`
   background-color: #ffffff;
   border: 1px solid #b8b8b8;
   border-bottom: none;
   padding: 15px 25px;
   color: 73777a;
`;

const Title = styled.p`
   font-weight: bold;
   margin-bottom: 0px;
`;

const StyledLink = styled(Link)`
   color: #73777a;
   :hover {
      color: #515151;
      cursor: pointer;
   }
`;

class Post extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         post: "",
         username: "",
         like: 0,
         comment: 0
      };
   }

   componentDidMount() {
      let config = {
         headers: {
            jwt: localStorage.getItem("jwt")
         }
      };

      // get likes number
      API.get(`/likes/count`, { params: { postID: this.state.post._id } })
         .then(res => {
            const like = res.data;
            this.setState({ like })
         })
         .catch(err => {
            console.log(err)
         });

      // get comments number
      API.get(`/comments/count`, { params: { postID: this.state.post._id } })
         .then(res => {
            const comment = res.data;
            this.setState({ comment })
         })
         .catch(err => {
            console.log(err)
         });


   }

   static getDerivedStateFromProps(props, state) {
      return {
         post: props.post || "",
         username: props.post.createdBy.username || ""
      };
   }

   render() {
      return (
         <Div>
            <Row>
               <Col>
                  <Title>
                     <StyledLink to={`/post/${this.state.post._id}`}>{this.state.post.title}</StyledLink>
                     {` [${this.state.post.category}]`}
                  </Title>
               </Col>
               <Col>
                  <div className="float-right">
                     <p style={{ fontSize: "0.75em",  display: 'inline-block' }}  className="m-0">
                        {`${this.state.like} likes `} <span style={{ display: "inline-block", width: "5px" }}></span>
                     </p> 
                     <FiHeart style={{ color: "#D62323"}}/>
                  </div>
               </Col>
            </Row>
            
            <Row>
               <Col>
                  <p style={{ fontSize: "0.75em" }} className="m-0">
                     {`${this.state.username}`}
                     <i>{` - ${moment(this.state.post.date).format("lll")}`}</i>
                  </p>
               </Col>
               <Col>
                  <div className="float-right">
                     <p style={{ fontSize: "0.75em",  display: 'inline-block' }} className="m-0">
                        {`${this.state.comment} comments`} <span style={{ display: "inline-block", width: "5px" }}></span>
                     </p>
                     <GoCommentDiscussion />
                  </div>
               </Col>
            </Row>
         </Div>
      );
   }
}

export default Post;
