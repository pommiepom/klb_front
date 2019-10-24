import React from "react";
import API from "../module/api";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import { Switch, Route, Link } from "react-router-dom";
import Signin from "../pages/Signin/Signin.jsx";

const StyledComment = styled.div`
   background-color: #ffffff;
   border: 1px solid #b8b8b8;
   border-bottom: 0;
   padding: 15px 35px;
`;

const Title = styled.p`
   font-weight: bold;
   margin-bottom: 0;
`;
const StyledP = styled.p`
   font-size: 0.75em;
   display: inline-block;
   margin: 0;
`;
const Span = styled.span`
   display: inline-block;
   width: 5px;
`;

const config = {
   headers: {
      jwt: localStorage.getItem("jwt")
   }
};

const getNumberOfLike = commentID => {
   return API.get(`/likes/comment/${commentID}/count`)
      .then(res => {
         const likeNum = res.data;

         return { likeNum };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

const checkUserLike = commentID => {
   if (config.headers.jwt) {
      return API.get(`/comments/${commentID}/checkuser`, config)
         .then(res => {
            const liked = res.data.length !== 0 ? true : false;

            return { liked };
         })
         .catch(err => {
            console.error(err);
            return err;
         });
   }
};

class Comment extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         comment: this.props.comment || [],
         likeNum: 0,
         liked: false,
         redirect: false
      };
   }

   componentDidMount() {
      const commentID = this.props.comment._id;
      const { currentPage, pageRangeDisplayed, index } = this.props;

      Promise.all([getNumberOfLike(commentID), checkUserLike(commentID)]).then(
         values => {
            const props = {};
            const order = (currentPage - 1) * pageRangeDisplayed + index + 1;

            values[values.length] = { order };

            for (let i = 0; i < values.length; i++) {
               const key = Object.keys(values[i])[0];
               const val = Object.values(values[i])[0];

               props[key] = val;
            }
            this.setState(props);
         }
      );
   }

   componentDidUpdate(prevProps) {
      if (prevProps.comment !== this.props.comment) {
         const commentID = this.props.comment._id;
         const { currentPage, pageRangeDisplayed, index } = this.props;

         Promise.all([
            getNumberOfLike(commentID),
            checkUserLike(commentID)
         ]).then(values => {
            const props = {};
            const order = (currentPage - 1) * pageRangeDisplayed + index + 1;

            values[values.length] = { order };

            for (let i = 0; i < values.length; i++) {
               const key = Object.keys(values[i])[0];
               const val = Object.values(values[i])[0];

               props[key] = val;
            }
            this.setState(props);
         });
      }
   }

   clickLike = () => {
      if (config.headers.jwt) {
         const { likeNum } = this.state;
         const commentID = this.props.comment._id;

         if (this.state.liked) {
            API.delete(`/likes/comment/${commentID}`, config)
               .then(() => {
                  this.setState({ likeNum: likeNum - 1 });
               })
               .catch(err => {
                  console.error(err);
               });
         } else {
            API.post(`/likes`, { commentID }, config)
               .then(() => {
                  this.setState({ likeNum: likeNum + 1 });
               })
               .catch(err => {
                  console.error(err);
               });
         }
         this.setState({ liked: !this.state.liked });
      } else {
         this.setState({ redirect: true });
      }
   };

   render() {
      const { redirect, liked, likeNum, order } = this.state;
      const { message, date } = this.props.comment;
      const username = this.props.comment.createdBy.username;

      return (
         <StyledComment>
            <Title>Comment {order}</Title>

            <hr style={{ marginTop: "5px", marginBottom: "20px" }} />

            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
               <p style={{ textAlign: "justify", fontSize: "0.8em" }}>
                  {message}
               </p>
            </div>

            <hr style={{ marginTop: "20px", marginBottom: "5px" }} />

            <Container fluid className="p-0">
               <Row>
                  <Col>
                     {liked ? (
                        <FaHeart
                           onClick={this.clickLike}
                           style={{ color: "#D62323", cursor: "pointer" }}
                        />
                     ) : (
                        <FiHeart
                           onClick={this.clickLike}
                           style={{ color: "#D62323", cursor: "pointer" }}
                        />
                     )}

                     {redirect && (
                        <Route exact path="/signin" component={Signin} />
                     )}
                     {/* {redirect && <Redirect to={{ pathname: "/signin", state: { prevPath: this.props.location.pathname }}}/>} */}
                     {/* {redirect && console.log(this.props.location)} */}

                     <StyledP>
                        <Span /> {`${likeNum} likes`}
                     </StyledP>
                  </Col>

                  <Col className="text-right">
                     <StyledP>
                        {username}
                        <i>{` - ${moment(date).format("lll")}`}</i>
                     </StyledP>
                  </Col>
               </Row>
            </Container>
         </StyledComment>
      );
   }
}

export default Comment;
