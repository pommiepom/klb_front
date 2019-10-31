import React from "react";
import styled from "styled-components";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Container, Row, Col } from "reactstrap";

class PaginationComp extends React.Component {
   render() {
      const StyledItem = styled(PaginationItem)`
         padding: 0;
      `;

      const StyledLink = styled(PaginationLink)`
         box-shadow: none !important;
      `;

      const StyledPagination = styled(Pagination)`
         background-color: transparent;
         border: 0px !important;
         margin-left: auto;
         margin-right: auto;
      `;

      const {
         disableButtom,
         pageNumbers,
         currentPage,
         pageLength
      } = this.props;

      const renderPageNumbers = pageNumbers.map((number, index) => {
         return (
            <StyledItem key={number}>
               <StyledLink
                  style={
                     number === currentPage
                        ? { backgroundColor: "#e9ecef" }
                        : {}
                  }
                  id={number}
                  onClick={() => this.props.changePage(number)}
               >
                  {number}
               </StyledLink>
            </StyledItem>
         );
      });

      return (
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
                           onClick={() => this.props.changePage(1)}
                        />
                     </StyledItem>
                     <StyledItem disabled={disableButtom.leftButton}>
                        <StyledLink
                           previous
                           onClick={() =>
                              this.props.changePage(currentPage - 1)
                           }
                        />
                     </StyledItem>
                     {renderPageNumbers}
                     <StyledItem disabled={disableButtom.rightButton}>
                        <StyledLink
                           next
                           onClick={() =>
                              this.props.changePage(currentPage + 1)
                           }
                        />
                     </StyledItem>
                     <StyledItem disabled={disableButtom.rightButton}>
                        <StyledLink
                           last
                           onClick={() => this.props.changePage(pageLength)}
                        />
                     </StyledItem>
                  </StyledPagination>
               </Col>
            </Row>
         </Container>
      );
   }
}

export default PaginationComp;
