import React from "react";
import styled from "styled-components";
import API from "../../module/api";
import { Row, Col } from "reactstrap";
import { Card, CardBody } from "reactstrap";

const Content = styled.div`
   background-color: #f9f9f9;
   padding: 75px;
   color: #73777a;
`;

const Headline = styled.h2`
   font-weight: bold;
`;

const StyledText = styled.p`
   // font-size: 0.8em !important;
`;

const config = {
   headers: {
      jwt: localStorage.getItem("jwt")
   }
};

class Search extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         user: ""
      };
   }

   componentDidMount() {
      API.get(`/users/signedIn`, config)
         .then(res => {
            const user = res.data[0];
            this.setState({ user });
         })
         .catch(err => {
            console.error(err);
         });
   }

   render() {
      const user = this.state.user;

      return (
         <Content>
            <Row>
               <Col xs={10} sm={8} md={7} l={6} className="mx-auto my-0">
                  <Card>
                     <CardBody
                        style={{ paddingLeft: "50px", paddingRight: "50px" }}
                     >
                        <Headline>Profile</Headline>
                        <hr
                           style={{ marginBottom: "30px", marginTop: "0px" }}
                        />

                        <Row>
                           <Col
                              xs={12}
                              md={5}
                              lg={4}
                              className="font-weight-bold"
                           >
                              <StyledText>Username:</StyledText>
                           </Col>
                           <Col xs={12} md={7} lg={8}>
                              <StyledText>{user.username}</StyledText>
                           </Col>
                        </Row>
                        <Row>
                           <Col
                              xs={12}
                              md={5}
                              lg={4}
                              className="font-weight-bold"
                           >
                              <StyledText>Firstname:</StyledText>
                           </Col>
                           <Col xs={12} md={7} lg={8}>
                              <StyledText>{user.firstname}</StyledText>
                           </Col>
                        </Row>
                        <Row>
                           <Col
                              xs={12}
                              md={5}
                              lg={4}
                              className="font-weight-bold"
                           >
                              <StyledText>Lastname:</StyledText>
                           </Col>
                           <Col xs={12} md={7} lg={8}>
                              <StyledText>{user.lastname}</StyledText>
                           </Col>
                        </Row>
                        <Row>
                           <Col
                              xs={12}
                              md={5}
                              lg={4}
                              className="font-weight-bold"
                           >
                              <StyledText>E-mail:</StyledText>
                           </Col>
                           <Col xs={12} md={7} lg={8}>
                              <StyledText>{user.email}</StyledText>
                           </Col>
                        </Row>
                        <Row>
                           <Col
                              xs={12}
                              md={5}
                              lg={4}
                              className="font-weight-bold"
                           >
                              <StyledText>Role:</StyledText>
                           </Col>
                           <Col xs={12} md={7} lg={8}>
                              <StyledText>{user.role}</StyledText>
                           </Col>
                        </Row>

                        <br />
                     </CardBody>
                  </Card>
               </Col>
            </Row>
         </Content>
      );
   }
}

export default Search;
