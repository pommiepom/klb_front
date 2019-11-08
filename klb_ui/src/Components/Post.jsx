import React from "react";
import API from "../module/api";
import moment from "moment";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
// import { FaCommentDots } from 'react-icons/fa'
import { GoCommentDiscussion } from "react-icons/go";

const Div = styled.div`
   background-color: #ffffff;
   border: 1px solid #b8b8b8;
   border-bottom: none;
   padding: 10px 20px;
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
   width: 5px;
`;

const StyledP = styled.p`
	font-size: 0.75em;
	display: inline-block;
	margin: 0
	color: #73777a !important;
`;

const StyledBadge = styled(Badge)`
   color: #73777a !important;
   background-color: transparent !important;
   border: 1px solid #73777a !important;
   font-weight: normal !important;
   margin-left: 5px !important
	:hover {
      color: #515151;
      cursor: pointer;
      text-decoration: underline;
   }
`;

const getNumberOfLike = postID => {
   return API.get(`/posts/${postID}/likes/count`)
      .then(res => {
         const likeNum = res.data;

         return { likeNum };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

const getNumberOfComment = postID => {
   return API.get(`/posts/${postID}/comments/count`)
      .then(res => {
         const commentNum = res.data;

         return { commentNum };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

class PostComponent extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         likeNum: 0,
         commentNum: 0
      };
   }

   componentDidMount() {
      const postID = this.props.post._id || "";

      Promise.all([getNumberOfLike(postID), getNumberOfComment(postID)]).then(
         values => {
            const props = {};

            for (let i = 0; i < values.length; i++) {
               const key = Object.keys(values[i])[0];
               const val = Object.values(values[i])[0];

               props[key] = val;
            }
            this.setState(props);
         }
      );
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevProps.post !== this.props.post) {
         const postID = this.props.post._id || "";

         Promise.all([
            getNumberOfLike(postID),
            getNumberOfComment(postID)
         ]).then(values => {
            const props = {};

            for (let i = 0; i < values.length; i++) {
               const key = Object.keys(values[i])[0];
               const val = Object.values(values[i])[0];

               props[key] = val;
            }
            this.setState(props);
         });
      }
   }

   render() {
      const postID = this.props.post._id;
      const username = this.props.post.createdBy.username;
      const { title, category, date } = this.props.post;
      const { commentNum, likeNum } = this.state;

      return (
         <Div>
            <Row>
               <Col>
                  <Row>
                     <Col>
                        <Title>
                           <StyledLink to={`/post/${postID}`}>
                              {title}
                           </StyledLink>
                           <StyledBadge>
                              {category}
                              <br />
                           </StyledBadge>
                        </Title>
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <StyledP>
                           {`${username}`}
                           <i>{` - ${moment(date).format("lll")}`}</i>
                        </StyledP>
                     </Col>
                  </Row>
               </Col>
               <Col xs={12} md={3} className="pl-0">
                  <Row>
                     <Col xs={2} sm={6} md={0} />
                     <Col xs={5} sm={3} md={12} className="text-right pl-0">
                        <StyledP>
                           {likeNum > 1
                              ? `${likeNum} likes`
                              : `${likeNum} like`}
                           <Span />
                        </StyledP>
                        <FiHeart style={{ color: "#D62323" }} />
                     </Col>
                     <Col xs={5} sm={3} md={12} className="text-right pl-0">
                        <StyledP>
                           {commentNum > 1
                              ? `${commentNum} comments`
                              : `${commentNum} comment`}
                           <Span />
                        </StyledP>
                        <GoCommentDiscussion />
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Div>
      );
   }
}

export default PostComponent;
