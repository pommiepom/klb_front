import React from "react";
import API from "../module/api";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { FiHeart } from 'react-icons/fi'

const StyledComment = styled.div`
	background-color: #ffffff;
   border: 1px solid #b8b8b8;
   border-bottom: 0;
	padding: 15px 35px;
`;

const Title = styled.p`
	font-weight: bold;
	margin-bottom: 0
`
const StyledP = styled.p`
   font-size: 0.75em;
   display: inline-block;
   margin: 0
`
const Span = styled.span`
   display: inline-block;
   width: 5px
`

class Comment extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         order: "",
         message: "",
         username: "",
         date: "",
         like: 0
         // post: "",
         // username: "",
         // like: "",
         // comment: ""
      };
   }

   componentDidMount() {
      const order = this.props.index + 1
      const message = this.props.comment.message
      const username = this.props.comment.createdBy.username
      const date = this.props.comment.date

      this.setState({ order, message, username, date })

      // get likes number
      API.get(`/likes/count`, { params: { commentID: this.props.comment._id } })
         .then(res => {
            const like = res.data;
            this.setState({ like })
         })
         .catch(err => {
            console.log(err)
         });
   }

   // UNSAFE_componentWillReceiveProps (nextProps) {
   //    const post = nextProps.post || ""
   //    const username = nextProps.post.createdBy.username || ""

   //    this.setState({ post, username }, () => {
   //       // get likes number
   //       API.get(`/likes/count`, { params: { postID: this.state.post._id } })
   //       .then(res => {
   //          const like = res.data;
   //          this.setState({ like })
   //       })
   //       .catch(err => {
   //          console.log(err)
   //       });

   //       // get comments number
   //       API.get(`/comments/count`, { params: { postID: this.state.post._id } })
   //       .then(res => {
   //          const comment = res.data;
   //          this.setState({ comment })
   //       })
   //       .catch(err => {
   //          console.log(err)
   //       });
   //    })
   // }

   render() {
      return (
         <StyledComment>
            <Title>Comment {this.state.order}</Title>
            <hr style={{ marginTop: "5px", marginBottom: "20px" }} />
            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
               <p style={{ textAlign: "justify", fontSize: "0.8em" }}>{this.state.message}</p>
            </div>
            <hr style={{ marginTop: "20px", marginBottom: "5px" }} />

            <Container fluid className="p-0">
               <Row>
                  <Col>
                     <FiHeart style={{ color: "#D62323"}}/>
                     <StyledP>
                        <Span /> {`${this.state.like} likes`} 
                     </StyledP> 
                  </Col>
                  <Col className="text-right">
                     <StyledP>
                        {this.state.username}<i>{` - ${moment(this.state.date).format("lll")}`}</i>
                     </StyledP>
                  </Col>
               </Row>
            </Container>

         </StyledComment>
      );
   }
}

export default Comment;
