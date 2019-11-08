import React from "react";
import API from "../../module/api";
import styled from "styled-components";
import { Button, Container, Row, Col } from "reactstrap";

import PostComponent from "../../components/Post.jsx";
import PaginationComp from "../../components/Pagination.jsx";

const Content = styled.div`
   background-color: #f9f9f9;
   padding: 75px;
   color: #73777a;
`;

const Headline = styled.h1`
   font-weight: bold;
`;

const getPostsLength = query => {
   return API.get(`/posts/count`, { params: query })
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
      const { postsPerPage, currentPage } = this.state;

      const props = {};
      const query = this.props.match.params;

      query.limit = this.state.postsPerPage;
      query.skip = 0;

      Promise.all([getPostsLength(query), getPosts(query)]).then(values => {
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
      // const currentPage = this.state.currentPage
      if (prevState.currentPage !== this.state.currentPage) {
         const { postsPerPage, currentPage } = this.state;
         
         const props = {};
         const query = this.props.match.params;

         query.limit = postsPerPage;
         query.skip = (currentPage - 1) * postsPerPage;

         Promise.all([getPostsLength(query), getPosts(query)]).then(values => {
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
         this.setState({ currentPage });
      }
   };
   
   routeNewPost = () => {
      const path = `/newpost`;
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
                           <Headline>Search</Headline>
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
