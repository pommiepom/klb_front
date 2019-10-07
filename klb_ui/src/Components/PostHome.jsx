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

const Span = styled.span`
   display: inline-block;
   width: 5px
`

const StyledP = styled.p`
   font-size: 0.75em;
   display: inline-block;
   margin: 0
   color: #73777a !important;
`

class PostHome extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         post: "",
         username: "",
         like: "",
         comment: ""
      };
   }

   componentDidMount() {
      const post = this.props.post || ""
      const username = this.props.post.createdBy.username || ""

      this.setState({ post, username }, () => {
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
      })
   }

   UNSAFE_componentWillReceiveProps (nextProps) {
      const post = nextProps.post || ""
      const username = nextProps.post.createdBy.username || ""

      this.setState({ post, username }, () => {
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
      })
   }

   render() {
      return (
         <Div>
            <Row>
               <Col>
                  <Row>
                     <Col>
                        <Title>
                           <StyledLink to={`/post/${this.state.post._id}`}>{this.state.post.title}</StyledLink>
                           {` [${this.state.post.category}]`}
                        </Title>
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <StyledP>
                           {`${this.state.username}`}
                           <i>{` - ${moment(this.state.post.date).format("lll")}`}</i>
                        </StyledP>
                     </Col>
                  </Row>
               </Col>
               <Col sm={3}>
                  <Row>
                     <Col className="text-right">
                        <StyledP>
                           {`${this.state.like} likes `} <Span />
                        </StyledP> 
                        <FiHeart style={{ color: "#D62323"}}/>
                     </Col>
                  </Row>
                  <Row>
                     <Col className="text-right">
                        <StyledP>
                           {`${this.state.comment} comments`} <Span />
                        </StyledP>
                        <GoCommentDiscussion />
                     </Col>
                  </Row>
               </Col>
            </Row>





 

            {/* <Row>
               <Col>
                  <Title>
                     <StyledLink to={`/post/${this.state.post._id}`}>{this.state.post.title}</StyledLink>
                     {` [${this.state.post.category}]`}
                  </Title>
               </Col>
               <Col sm={3}>
                  <div className="float-right">
                     <StyledP>
                        {`${this.state.like} likes `} <Span />
                     </StyledP> 
                     <FiHeart style={{ color: "#D62323"}}/>
                  </div>
               </Col>
            </Row>
            
            <Row>
               <Col>
                  <StyledP>
                     {`${this.state.username}`}
                     <i>{` - ${moment(this.state.post.date).format("lll")}`}</i>
                  </StyledP>
               </Col>
               <Col sm={3}>
                  <div className="float-right">
                     <StyledP>
                        {`${this.state.comment} comments`} <Span />
                     </StyledP>
                     <GoCommentDiscussion />
                  </div>
               </Col>
            </Row>  */}
         </Div>
      );
   }
}

export default PostHome;
