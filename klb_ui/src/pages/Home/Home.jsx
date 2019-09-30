import React from "react";
import API from "../../module/api";
import $ from "jquery";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { Button } from "reactstrap";
import Post from "../../components/Post.jsx";
import PaginationButton from "../../components/Pagination.jsx";
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
   border-radius: 25px !important;
   padding-left: 15px !important;
   padding-right: 15px !important;
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
   color: #73777a;
   border: 0px !important;
`;

class NewPost extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         posts: [],
         currentPage: 1,
         postsPerPage: 10,
         pageLength: 1
      };
      this.handleClick = this.handleClick.bind(this);
      this.first = this.first.bind(this);
      this.previous = this.previous.bind(this);
      this.next = this.next.bind(this);
      this.last = this.last.bind(this);
   }

   componentDidMount() {
      API.get(`/posts`).then(res => {
         const posts = res.data;
         this.setState({ posts });
      });
   }

   first() {
      this.setState({
         currentPage: 1
      });
   }

   previous() {
      this.setState({
         currentPage: this.state.currentPage - 1
      });
   }

   next() {
      this.setState({
         currentPage: this.state.currentPage + 1
      });
   }

   last() {
      this.setState({
         currentPage: Math.ceil(
            this.state.posts.length / this.state.postsPerPage
         )
      });
   }

   handleClick(event) {
      this.setState({
         currentPage: Number(event.target.id)
      });
   }

   render() {
      const disableButtom = { leftButton: false, rightButton: false };
      const { posts, currentPage, postsPerPage } = this.state;

      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

      const renderPost = currentPosts.map((post, index) => {
         return <Post key={index} post={post} />;
      });

      const pageRangeDisplayed = 10;
      const pageLength = Math.ceil(posts.length / postsPerPage);
      const pageNumbers = [];

		const calLastPageNum = Math.floor((currentPage - 1) / pageRangeDisplayed) * pageRangeDisplayed + pageRangeDisplayed

		const firstPageNum = Math.floor((currentPage - 1) / pageRangeDisplayed) * pageRangeDisplayed + 1
		const lastPageNum = calLastPageNum > pageLength ? pageLength : calLastPageNum

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

      disableButtom.leftButton = currentPage == 1 ? true : false;
      disableButtom.rightButton = currentPage == pageLength ? true : false;

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
                  <div
                     style={{
                        borderBottom: "1px solid #b8b8b8",
                        marginBottom: "50px"
                     }}
                  >
                     {renderPost}
                  </div>

                  <div
                     style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "auto"
                     }}
                  >
                     <StyledPagination>
                        <StyledItem disabled={disableButtom.leftButton}>
                           <StyledLink first onClick={this.first} />
                        </StyledItem>
                        <StyledItem disabled={disableButtom.leftButton}>
                           <StyledLink previous onClick={this.previous} />
                        </StyledItem>
                        {renderPageNumbers}
                        <StyledItem disabled={disableButtom.rightButton}>
                           <StyledLink next onClick={this.next} />
                        </StyledItem>
                        <StyledItem disabled={disableButtom.rightButton}>
                           <StyledLink last onClick={this.last} />
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
