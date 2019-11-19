import React from "react";
import API from "../../module/api";
import styled from "styled-components";
import { Container, Row, Col, Table } from "reactstrap";
import { CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";

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

const StyledLink = styled(Link)`
   color: #73777a;
   :hover {
      color: #515151;
      cursor: pointer;
   }
`;

const StyledTr = styled.tr`
   color: #73777a;
`;

const config = {
   headers: {
      jwt: localStorage.getItem("jwt")
   }
};

const getReportedPost = query => {
   let configGet = Object.assign({}, config);
   configGet.params = query;

   return API.get(`/reports`, configGet)
      .then(res => {
         const posts = res.data;
         return { posts };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

const getReportedNum = () => {
   return API.get(`/reports/count`, config)
      .then(res => {
         const reportedNum = res.data;
         return reportedNum;
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

class ReportedPost extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         posts: [],
         postsLength: 0,
         currentPage: 1,
         reportPerPage: 10,
         pageLength: 1,
         pageRangeDisplayed: 10
      };
   }

   componentDidMount() {
      const { reportPerPage } = this.state;

      const limit = reportPerPage;
      const skip = 0;

      const props = {};
      const query = { limit, skip };

      Promise.all([getReportedPost(query), getReportedNum()]).then(values => {
         const pageLength = Math.ceil(
            Object.values(values[1])[0] / reportPerPage
         );

         values[values.length] = { pageLength };

         for (let i = 0; i < values.length; i++) {
            const key = Object.keys(values[i])[0];
            const val = Object.values(values[i])[0];

            props[key] = val;
         }

         this.setState(props);
      });
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevState.currentPage !== this.state.currentPage) {
         const { reportPerPage, currentPage } = this.state;

         const limit = reportPerPage;
         const skip = (currentPage - 1) * limit;

         const props = {};
         const query = { limit, skip };

         Promise.all([getReportedPost(query), getReportedNum()]).then(
            values => {
               const pageLength = Math.ceil(
                  Object.values(values[1])[0] / reportPerPage
               );

               values[values.length] = { pageLength };

               for (let i = 0; i < values.length; i++) {
                  const key = Object.keys(values[i])[0];
                  const val = Object.values(values[i])[0];

                  props[key] = val;
               }
               this.setState(props);
            }
         );
      }
   }

   changePage = currentPage => {
      if (currentPage !== this.state.currentPage) {
         this.setState({ currentPage });
      }
   };

   render() {
      const disableButtom = { leftButton: false, rightButton: false };
      const { posts, currentPage, pageLength, pageRangeDisplayed } = this.state;

      const renderReport = posts.map((post, index) => {
         return (
            <StyledTr key={index}>
               <td>
                  <StyledLink to={`/post/${post.postID}`}>
                     {post.post.title}
                  </StyledLink>
               </td>
               <td>{post.reportedBy.username}</td>
               <td>{post.description}</td>
            </StyledTr>
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
                  <Col xs={7} className="mx-auto my-0">
                     <Card style={{ marginBottom: "30px" }}>
                        <CardBody
                           style={{ paddingLeft: "50px", paddingRight: "50px" }}
                        >
                           <Headline>Report</Headline>

                           <div style={{ paddingTop: "10px" }}>
                              <Table size="sm" striped>
                                 <thead>
                                    <StyledTr>
                                       <th>Post</th>
                                       <th>Reported by</th>
                                       <th>Description</th>
                                    </StyledTr>
                                 </thead>
                                 <tbody>{renderReport}</tbody>
                              </Table>
                           </div>
                        </CardBody>
                     </Card>
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

export default ReportedPost;
