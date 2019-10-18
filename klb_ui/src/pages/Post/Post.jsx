import React from "react";
import API from "../../module/api";
import styled from "styled-components";
import moment from "moment";
import { Container, Row, Col } from "reactstrap";
import { Button } from "reactstrap";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import { Badge } from "reactstrap";
import File from "../../components/File.jsx";
import Comment from "../../components/Comment.jsx";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import PaginationButton from "../../components/Pagination.jsx";

const Content = styled.div`
   background-color: #f9f9f9;
   padding: 75px;
   color: #73777a;
`;

const StyledPost = styled.div`
   background-color: #ffffff;
   border: 1px solid #b8b8b8;
   padding: 15px 35px;
   color: 73777a;
`;

const Title = styled.p`
   font-weight: bold;
   margin-bottom: 0;
`;
const ButtonEdit = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
   font-weight: bold !important;
   font-size: 0.7em !important;
   border-radius: 25px !important;
   padding-left: 15px !important;
   padding-right: 15px !important;
`;

const Span = styled.span`
   display: inline-block;
   width: 5px;
`;

const StyledP = styled.p`
   font-size: 0.75em;
   display: inline-block;
   margin: 0;
`;

const StyledDetail = styled.p`
   white-space: pre-wrap;
   display: inline-block;
   font-size: 0.8em;
   margin: 0;
   text-align: justify;
`;

const StyleCommentsNum = styled.p`
   display: inline-block;
   font-size: 0.8em;
   margin: 0;
   text-align: center;
`;

const StyledBadge = styled(Badge)`
   color: #ffffff !important;
   background-color: #b5c9d4 !important;
   border: none !important;
   font-weight: normal !important;
   margin-left: 10px !important;
`;

const StyledPagination = styled(Pagination)`
   background-color: transparent;
   border: 0px !important;
   margin-left: auto;
   margin-right: auto;
`;

const StyledItem = styled(PaginationItem)`
   padding: 0;
`;

const StyledLink = styled(PaginationLink)`
   box-shadow: none !important;
   // hover: {
   // 	background-color: #b5c9d4 !important
   // }
`;

const config = {
   headers: {
      jwt: localStorage.getItem("jwt")
   }
};

class Post extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         post: "",
         postID: "",
         username: "",
         likeNum: "",
         files: [],
         comments: [],
         liked: false,
         redirect: false,
         commentsLength: 0,
         currentPage: 1,
         commentsPerPage: 10,
         pageLength: 1,
         pageRangeDisplayed: 10
      };
   }

   static getDerivedStateFromProps(props, state) {
      return {
         postID: props.match.params.id || ""
      };
   }

   componentDidMount() {
      console.log("mount");
      this.setState({
         currentPage: Number(this.props.match.params.currentPage || 1)
      });

      const postID = this.state.postID;

      API.get(`/posts/${postID}`, config)
         .then(res => {
            const post = res.data[0];
            // const username = res.data[0].createdBy.username;
            // const files = res.data[0].fileID;

            this.setState({ post });
         })
         .catch(err => {
            console.error(err);
         });

      // get likes number
      API.get(`/posts/${postID}/likes/count`)
         .then(res => {
            const likeNum = res.data;
            this.setState({ likeNum });
         })
         .catch(err => {
            console.error(err);
         });

      API.get(`/posts/${postID}/comments/count`).then(res => {
         this.setState({ commentsLength: res.data }, () => {
            this.setState({
               pageLength: Math.ceil(
                  this.state.commentsLength / this.state.commentsPerPage
               )
            });
         });
      });

      // get comments
      const limit = this.state.commentsPerPage;
      const skip = 0;

      API.get(`/posts/${postID}/comments`, { params: { limit, skip } }).then(
         res => {
            const comments = res.data;
            this.setState({ comments });
         }
      );

      // check user like
      if (config.headers.jwt) {
         API.get(`/posts/${postID}/checkuser`, config)
            .then(res => {
               res.data.length !== 0
                  ? this.setState({ liked: true })
                  : this.setState({ liked: false });
            })
            .catch(err => {
               console.error(err);
            });
      }
   }

   clickLike = () => {
      if (config.headers.jwt) {
         // logged in
         const { likeNum, postID, liked } = this.state;

         if (liked) {
            API.delete(`/likes/post/${postID}`, config)
               .then(() => {
                  this.setState({ likeNum: likeNum - 1 });
               })
               .catch(err => {
                  console.error(err);
               });
         } else {
            API.post(`/likes`, { postID }, config)
               .then(() => {
                  this.setState({ likeNum: likeNum + 1 });
               })
               .catch(err => {
                  console.error(err);
               });
         }

         this.setState({ liked: !liked });
      } else {
         this.setState({ redirect: true });
      }
   };

   handleClick = event => {
      const currentPage = Number(event.target.id);

      if (currentPage !== this.state.currentPage) {
         this.setState({ currentPage });

         const limit = this.state.commentsPerPage;
         const skip = (currentPage - 1) * limit;
         const postID = this.state.postID;

         API.get(`/posts/${postID}/comments`, { params: { limit, skip } }).then(
            res => {
               const comments = res.data;
               this.setState({ comments });
            }
         );
      }
   };

   changePage = currentPage => {
      this.setState({ currentPage }, () => {
         const limit = this.state.commentsPerPage;
         const skip = (currentPage - 1) * limit;
         const postID = this.state.postID;

         API.get(`/posts/${postID}/comments`, {
            params: { limit, skip }
         }).then(res => {
            const comments = res.data;
            this.setState({ comments });
         });
      });
   };

   render() {
      console.log("render");
      const disableButtom = { leftButton: false, rightButton: false };
      const { comments, files } = this.state;
      const { redirect, liked, likeNum } = this.state;
      const { currentPage, pageLength, pageRangeDisplayed } = this.state;

      const renderFile = files.map((file, index) => {
         return <File key={index} file={file} />;
      });
      const renderComment = comments.map((comment, index) => {
         return (
            <Comment
               key={index}
               index={index}
               currentPage={currentPage}
               pageRangeDisplayed={pageRangeDisplayed}
               comment={comment}
            />
         );
      });

      const pageNumbers = [];

      const calLastPageNum =
         Math.floor((currentPage - 1) / pageRangeDisplayed) *
            pageRangeDisplayed +
         pageRangeDisplayed;
      const firstPageNum =
         Math.floor((currentPage - 1) / pageRangeDisplayed) *
            pageRangeDisplayed +
         1;
      const lastPageNum =
         calLastPageNum > pageLength ? pageLength : calLastPageNum;

      for (let i = firstPageNum; i < lastPageNum + 1; i++) {
         pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map((number, index) => {
         return (
            <PaginationButton
               handleClick={this.handleClick}
               key={index}
               number={number}
               currentPage={currentPage}
            />
         );
      });

      disableButtom.leftButton = currentPage === 1 ? true : false;
      disableButtom.rightButton = currentPage === pageLength ? true : false;

      return (
         <Content>
            <Row>
               <Col xs={7} className="mx-auto my-0">
                  <StyledPost>
                     <Row>
                        <Col>
                           <Title>{this.state.post.title}</Title>
                        </Col>
                        <Col>
                           <ButtonEdit size="sm" className="float-right">
                              EDIT
                           </ButtonEdit>
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <p style={{ fontSize: "0.75em" }} className="m-0">
                              {this.state.username}
                              <i>{` - ${moment(this.state.post.date).format(
                                 "lll"
                              )}`}</i>
                              <StyledBadge>
                                 {this.state.post.category}
                              </StyledBadge>
                           </p>
                        </Col>
                     </Row>
                     <hr style={{ marginTop: "5px", marginBottom: "20px" }} />
                     <Container>
                        <Row>
                           <Col>
                              <StyledDetail>
                                 {this.state.post.detail}
                              </StyledDetail>
                           </Col>
                        </Row>
                        {files && (
                           <Container
                              style={{ marginTop: "10px", paddingLeft: 0 }}
                           >
                              {renderFile}
                           </Container>
                        )}
                     </Container>

                     <hr style={{ marginTop: "20px", marginBottom: "5px" }} />

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

                           {redirect && <Redirect to="/" />}

                           <StyledP className="text-center">
                              <Span />
                              {`${likeNum} likes`}
                           </StyledP>
                        </Col>
                        <Col>
                           <p
                              style={{ fontSize: "0.75em" }}
                              className="m-0 float-right"
                           >
                              <i>{`last updated - ${moment(
                                 this.state.post.lastUpdated
                              ).format("lll")}`}</i>
                           </p>
                        </Col>
                     </Row>
                  </StyledPost>
                  <Row className="my-4">
                     <Col>
                        <hr />
                     </Col>
                     <Col sm={2} className="mx-auto">
                        <StyleCommentsNum>
                           {this.state.commentsLength} comments
                        </StyleCommentsNum>
                     </Col>
                     <Col>
                        <hr />
                     </Col>
                  </Row>

                  {comments.length > 0 && (
                     <div style={{ borderBottom: "1px solid #b8b8b8" }}>
                        {renderComment}
                     </div>
                  )}
               </Col>
            </Row>
            <br />

            <Container
               fluid
               style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "auto"
               }}
            >
               <Row>
                  <Col>
                     <StyledPagination className="d-flex justify-content-center">
                        <StyledItem disabled={disableButtom.leftButton}>
                           <StyledLink
                              first
                              onClick={() => this.changePage(1)}
                           />
                        </StyledItem>
                        <StyledItem disabled={disableButtom.leftButton}>
                           <StyledLink
                              previous
                              onClick={() =>
                                 this.changePage(this.state.currentPage - 1)
                              }
                           />
                        </StyledItem>
                        {renderPageNumbers}
                        <StyledItem disabled={disableButtom.rightButton}>
                           <StyledLink
                              next
                              onClick={() =>
                                 this.changePage(this.state.currentPage + 1)
                              }
                           />
                        </StyledItem>
                        <StyledItem disabled={disableButtom.rightButton}>
                           <StyledLink
                              last
                              onClick={() =>
                                 this.changePage(this.state.pageLength)
                              }
                           />
                        </StyledItem>
                     </StyledPagination>
                  </Col>
               </Row>
            </Container>
         </Content>
      );
   }
}

export default Post;