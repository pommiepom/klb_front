import React from "react";
import API from "../../module/api";
import styled from "styled-components";
import { Button, Container, Row, Col } from "reactstrap";

import PostComponent from "../../components/Post.jsx";
import PaginationComp from "../../components/Pagination.jsx";

const Content = styled.div`
   background-color: #f9f9f9;
   padding-bottom: 75px;
   padding-top: 75px;
   color: #73777a;
`;

const Headline = styled.h1`
   font-weight: bold;
`;

const ButtonNewPost = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
   font-weight: bold !important;
   border-radius: 25px !important;
   padding-left: 15px !important;
   padding-right: 15px !important;
`;

const config = {
   headers: {
      jwt: localStorage.getItem("jwt")
   }
};

const getPostsLength = () => {
   return API.get(`/posts/count`)
      .then(res => {
         const postsLength = res.data;

         return { postsLength };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

const getPosts = query => {
   return API.get(`/posts`, { params: query })
      .then(res => {
         const posts = res.data;

         return { posts };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

class NewPost extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         posts: [],
         postsLength: 0,
         currentPage: 1,
         postsPerPage: 10,
         pageLength: 1,
         pageRangeDisplayed: 10
      };
   }

   componentDidMount() {
      const currentPage = Number(this.props.match.params.currentPage) || 1;
      const { postsPerPage } = this.state;

      const props = {};
      const limit = postsPerPage;
      const skip = (currentPage - 1) * limit;
      const query = { limit, skip };

      Promise.all([getPostsLength(), getPosts(query)]).then(values => {
         const pageLength = Math.ceil(
            Object.values(values[0])[0] / postsPerPage
         );

         values[values.length] = { pageLength };
         values[values.length] = { currentPage };

         for (let i = 0; i < values.length; i++) {
            const key = Object.keys(values[i])[0];
            const val = Object.values(values[i])[0];

            props[key] = val;
         }
         this.setState(props);
      });
   }

   componentDidUpdate(prevProps, prevState) {
      const currentPage = isNaN(this.props.match.params.currentPage)
         ? 1
         : Number(this.props.match.params.currentPage);

      if (
         prevProps.match.params.currentPage !==
         this.props.match.params.currentPage
      ) {
         const { postsPerPage } = this.state;

         const props = {};
         const limit = postsPerPage;
         const skip = (currentPage - 1) * limit;
         const query = { limit, skip };

         Promise.all([getPostsLength(), getPosts(query)]).then(values => {
            const pageLength = Math.ceil(
               Object.values(values[0])[0] / postsPerPage
            );

            values[values.length] = { pageLength };
            values[values.length] = { currentPage };

            for (let i = 0; i < values.length; i++) {
               const key = Object.keys(values[i])[0];
               const val = Object.values(values[i])[0];

               props[key] = val;
            }
            this.setState(props);
         });
      }
   }

   changePage = currentPage => {
      if (currentPage !== this.state.currentPage) {
         this.setState({ currentPage }, () => {
            this.routeChange();
         });
      }
   };

   routeChange = () => {
      const path = `/page/${this.state.currentPage}`;
      this.props.history.push(path);
   };

   routeNewPost = () => {
      const path = config.headers.jwt ? `/newpost` : `/signin`;
      this.props.history.push(path);
   };

   render() {
      const disableButtom = { leftButton: false, rightButton: false };
      const { posts, currentPage, pageLength, pageRangeDisplayed } = this.state;

      const renderPost = posts.map((post, index) => {
         return <PostComponent key={index} post={post} />;
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
                  <Col xs={10} sm={9} md={7} lg={6} className="mx-auto my-0">
                     <Row>
                        <Col>
                           <Headline>Post</Headline>
                        </Col>
                        <Col>
                           <ButtonNewPost
                              className="float-right"
                              onClick={this.routeNewPost}
                           >
                              New Post
                           </ButtonNewPost>
                        </Col>
                     </Row>
                     <div
                        style={{
                           borderBottom: "1px solid #b8b8b8",
                           marginBottom: "50px"
                        }}
                     >
                        {renderPost}
                     </div>

                     <PaginationComp
                        changePage={this.changePage}
                        currentPage={currentPage}
                        pageNumbers={pageNumbers}
                        disableButtom={disableButtom}
                        pageLength={pageLength}
                     />
                  </Col>
               </Row>
            </Container>
         </Content>
      );
   }
}

export default NewPost;
