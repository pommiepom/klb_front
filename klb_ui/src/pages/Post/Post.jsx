import React from "react";
import API from "../../module/api";
import styled from "styled-components";
import moment from "moment";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Badge } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import {
   Dropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem
} from "reactstrap";
import { FaChevronDown } from "react-icons/fa";

import File from "../../components/File.jsx";
import Comment from "../../components/Comment.jsx";
import PaginationComp from "../../components/Pagination.jsx";

const Content = styled.div`
   background-color: #f9f9f9;
   padding-bottom: 75px;
   padding-top: 75px;
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
const StyledDropdown = styled(DropdownToggle)`
   background-color: #fd7e47 !important;
   border: none !important;
   font-weight: bold !important;
   font-size: 0.7em !important;
   // border-radius: 25px !important;
   // padding-left: 15px !important;
   // padding-right: 15px !important;
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
   color: #73777a !important;
   background-color: transparent !important;
   border: solid 1px #73777a !important;
   font-weight: normal !important;
   margin-left: 10px !important;
`;

const ButtonSubmit = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
   font-weight: bold !important;
   margin-left: auto;
   margin-right: auto;
`;

const StyledTextarea = styled(Input)`
   min-height: 125px;
   box-shadow: none !important;
   :focus {
      border-color: #495057 !important;
   }
`;

const config = {
   headers: {
      jwt: localStorage.getItem("jwt")
   }
};

const getPost = postID => {
   return API.get(`/posts/${postID}`, config)
      .then(res => {
         const post = Array.isArray(res.data) ? res.data[0] : res.data;

         return { post };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

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

const checkUserLike = postID => {
   if (config.headers.jwt) {
      return API.get(`/posts/${postID}/checkuser`, config)
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

const getComments = (postID, currentPage, commentsPerPage) => {
   const limit = commentsPerPage;
   const skip = (currentPage - 1) * limit;

   return API.get(`/posts/${postID}/comments`, { params: { limit, skip } })
      .then(res => {
         const comments = res.data;

         return { comments };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

const getCommentsLength = postID => {
   return API.get(`/posts/${postID}/comments/count`)
      .then(res => {
         const commentsLength = res.data;

         return { commentsLength };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

const getUserNow = () => {
   return API.get(`/users/signedIn`, config)
      .then(res => {
         const userNow = {};
         userNow.username = res.data[0].username;
         userNow.role = res.data[0].role;
         return { userNow };
      })
      .catch(err => {
         console.error(err);
      });
};

class Post extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         userNow: "",
         postID: "",
         post: "",
         username: "",
         likeNum: "",
         files: [],
         comments: [],
         liked: false,
         commentsLength: 0,
         currentPage: 1,
         commentsPerPage: 10,
         pageLength: 1,
         pageRangeDisplayed: 5,
         dropdownOpen: false
      };
      this.myRef = React.createRef();
   }

   static getDerivedStateFromProps(props, state) {
      return {
         postID: props.match.params.id || ""
      };
   }

   componentDidMount() {
      const { currentPage, postID, commentsPerPage } = this.state;

      Promise.all([
         getPost(postID),
         getNumberOfLike(postID),
         checkUserLike(postID),
         getComments(postID, currentPage, commentsPerPage),
         getCommentsLength(postID),
         getUserNow()
      ]).then(values => {
         const props = {};
         const username = values[0].post.createdBy.username;
         const files = values[0].post.fileID;

         const pageLength = Math.ceil(
            Object.values(values[4])[0] / commentsPerPage
         );

         values[values.length] = { pageLength };
         values[values.length] = { username };
         values[values.length] = { files };

         for (let i = 0; i < values.length; i++) {
            const key = values[i] ? Object.keys(values[i])[0] : null;
            const val = values[i] ? Object.values(values[i])[0] : null;
            props[key] = val;
         }
         this.setState(props);
      });
      window.scrollTo(0, 0);
   }

   componentDidUpdate(prevProps, prevState) {
      if (
         prevState.commentsLength !== this.state.commentsLength ||
         prevState.currentPage !== this.state.currentPage
      ) {
         const { currentPage, postID, commentsPerPage } = this.state;

         Promise.all([
            getPost(postID),
            getNumberOfLike(postID),
            checkUserLike(postID),
            getComments(postID, currentPage, commentsPerPage),
            getCommentsLength(postID),
            getUserNow()
         ]).then(values => {
            const props = {};
            const username = values[0].post.createdBy.username;
            const files = values[0].post.fileID;
            const pageLength = Math.ceil(
               Object.values(values[4])[0] / commentsPerPage
            );

            values[values.length] = { pageLength };
            values[values.length] = { username };
            values[values.length] = { files };

            for (let i = 0; i < values.length; i++) {
               const key = values[i] ? Object.keys(values[i])[0] : null;
               const val = values[i] ? Object.values(values[i])[0] : null;
               props[key] = val;
            }
            this.setState(props);
         });

         if (prevState.currentPage !== this.state.currentPage) {
            this.scrollToMyRef();
         }
         else {
            window.scrollTo(0, 0);
         }
      }
   }

   myChangeHandler = event => {
      let name = event.target.name;
      let val = event.target.value;
      this.setState({ [name]: val });
   };

   mySubmitHandler = event => {
      event.preventDefault();

      const { comment, postID } = this.state;

      const data = {};
      data.message = comment;
      data.postID = postID;

      if (comment !== undefined && comment !== "") {
         API.post("/comments", data, config)
            .then(() => {
               const commentsLength = this.state.commentsLength + 1;
               const pageLength = Math.ceil(
                  commentsLength / this.state.commentsPerPage
               );

               this.setState({
                  currentPage: pageLength,
                  pageLength,
                  commentsLength
               });
            })
            .catch(err => {
               console.error(err);
            });
      }
   };

   clickLike = () => {
      if (config.headers.jwt) {
         // signed in
         const { likeNum, postID, liked } = this.state;

         if (liked) {
            API.delete(`/likes/post/${postID}`, config)
               .then(() => {
                  this.setState({ likeNum: likeNum - 1, liked: !liked });
               })
               .catch(err => {
                  console.error(err);
               });
         } else {
            API.post(`/likes`, { postID }, config)
               .then(() => {
                  this.setState({ likeNum: likeNum + 1, liked: !liked });
               })
               .catch(err => {
                  console.error(err);
               });
         }
      } else {
         this.props.history.push(`/signin`);
      }
   };

   changePage = currentPage => {
      if (currentPage !== this.state.currentPage) {
         this.setState({ currentPage });
      }
   };

   toggle = () => {
      console.log("toggle");
      this.setState({ dropdownOpen: !this.state.dropdownOpen });
   };

   scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

   render() {
      const disableButtom = { leftButton: false, rightButton: false };
      const { postID, post, comments, files, username } = this.state;
      const { userNow, liked, likeNum } = this.state;
      const {
         currentPage,
         pageLength,
         commentsPerPage,
         pageRangeDisplayed
      } = this.state;

      const renderFile = files.map((file, index) => {
         return (
            <div key={index}>
               <File file={file} />
            </div>
         );
      });

      const renderComment = comments.map((comment, index) => {
         return (
            <Comment
               key={index}
               index={index}
               currentPage={currentPage}
               commentsPerPage={commentsPerPage}
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

      disableButtom.leftButton = currentPage === 1 ? true : false;
      disableButtom.rightButton = currentPage === pageLength ? true : false;

      return (
         <Content>
            <Container fluid>
               <Row>
                  <Col xs={10} sm={8} md={7} l={6} className="mx-auto my-0">
                     <StyledPost>
                        <Row>
                           <Col>
                              <Title>{post.title}</Title>
                           </Col>
                           <Col xs={2}>
                              <Dropdown
                                 className="float-right"
                                 size="sm"
                                 isOpen={this.state.dropdownOpen}
                                 toggle={this.toggle}
                              >
                                 <StyledDropdown>
                                    <FaChevronDown />
                                 </StyledDropdown>
                                 <DropdownMenu right>
                                    {username === userNow.username && (
                                       <DropdownItem
                                          onClick={() => {
                                             this.props.history.push(
                                                `/post/${postID}/edit`
                                             );
                                          }}
                                       >
                                          Edit
                                       </DropdownItem>
                                    )}
                                    <DropdownItem>Report</DropdownItem>
                                    {userNow.role === "admin" && (
                                       <DropdownItem>Disable Post</DropdownItem>
                                    )}
                                 </DropdownMenu>
                              </Dropdown>
                           </Col>
                        </Row>
                        <Row>
                           <Col>
                              <p style={{ fontSize: "0.75em" }} className="m-0">
                                 {username}
                                 <i>{` - ${moment(post.date).format(
                                    "lll"
                                 )}`}</i>
                                 <StyledBadge>{post.category}</StyledBadge>
                              </p>
                           </Col>
                        </Row>
                        <hr
                           style={{ marginTop: "5px", marginBottom: "20px" }}
                        />
                        <Container>
                           <Row>
                              <Col>
                                 <StyledDetail>{post.detail}</StyledDetail>
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

                        <hr
                           style={{ marginTop: "20px", marginBottom: "5px" }}
                        />

                        <Row>
                           <Col>
                              {liked ? (
                                 <FaHeart
                                    onClick={this.clickLike}
                                    style={{
                                       color: "#D62323",
                                       cursor: "pointer"
                                    }}
                                 />
                              ) : (
                                 <FiHeart
                                    onClick={this.clickLike}
                                    style={{
                                       color: "#D62323",
                                       cursor: "pointer"
                                    }}
                                 />
                              )}

                              <StyledP className="text-center">
                                 <Span />
                                 {likeNum > 1
                                    ? `${likeNum} likes`
                                    : `${likeNum} like`}
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
                        <Col
                           xs={4}
                           md={3}
                           l={2}
                           className="mx-auto text-center"
                        >
                           <StyleCommentsNum>
                              {this.state.commentsLength > 1
                                 ? `${this.state.commentsLength} comments`
                                 : `${this.state.commentsLength} comment`}
                           </StyleCommentsNum>
                        </Col>
                        <Col>
                           <hr />
                        </Col>
                     </Row>

                     <div ref={this.myRef}>
                        {comments.length > 0 && (
                           <div style={{ borderBottom: "1px solid #b8b8b8" }}>
                              {renderComment}
                           </div>
                        )}
                     </div>

                     <br />
                     <PaginationComp
                        changePage={this.changePage}
                        currentPage={currentPage}
                        pageNumbers={pageNumbers}
                        disableButtom={disableButtom}
                        pageLength={pageLength}
                     />

                     <Form onSubmit={this.mySubmitHandler}>
                        <FormGroup>
                           <Label for="comment" className="font-weight-bold">
                              New Comment
                           </Label>
                           <StyledTextarea
                              onChange={this.myChangeHandler}
                              type="textarea"
                              name="comment"
                              id="comment"
                           />
                        </FormGroup>
                        <br />
                        <Row>
                           <ButtonSubmit type="submit">Submit</ButtonSubmit>
                        </Row>
                     </Form>
                  </Col>
               </Row>
            </Container>
         </Content>
      );
   }
}

export default Post;
