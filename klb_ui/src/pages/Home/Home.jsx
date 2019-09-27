import React from "react";
import API from "../../module/api";
// import $ from "jquery";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { Button } from "reactstrap";
import Post from "../../components/Post.jsx";
import PaginationButton from "../../components/Pagination.js";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

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

const StyledPagination = styled(Pagination)`
   background-color: transparent;
	margin-left: auto;
	margin-right: auto
`;

const StyledItem = styled(PaginationItem)`
   padding: 0;
`;

class NewPost extends React.Component {
   constructor(props) {
      super(props);
      this.state = { posts: [], currentPage: 1, postsPerPage: 10 };
      this.handleClick = this.handleClick.bind(this);
   }

   componentDidMount() {
      API.get(`/posts`).then(res => {
         const posts = res.data;
         this.setState({ posts });
      });
   }

   handleClick(event) {
      this.setState({
         currentPage: Number(event.target.id)
      });
   }

   render() {
      const { posts, currentPage, postsPerPage } = this.state;

      // Logic for displaying current todos
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

      const renderPost = currentPosts.map((post, index) => {
         return <Post key={index} post={post} />;
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
         pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map((number, index) => {
         return (
            <PaginationButton
               handleClick={this.handleClick}
               key={index}
               number={number}
            />
         );
      });

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
                  <div style={{ border: "1px solid #b8b8b8", marginBottom: "50px" }}>
                     {renderPost}
                  </div>

							<div style={{ marginLeft: "auto", marginRight: "auto", width: "auto" }}>
                  <StyledPagination>
								<StyledItem disabled>
									<PaginationLink first href="#" />
								</StyledItem>
								<StyledItem disabled>
									<PaginationLink previous href="#" />
								</StyledItem>
								{renderPageNumbers}
								<StyledItem>
									<PaginationLink next href="#" />
								</StyledItem>
								<StyledItem>
									<PaginationLink last href="#" />
								</StyledItem>
                  </StyledPagination>
							</div>
               </Col>
            </Row>
         </Content>
      );
   }
}

export default NewPost;
