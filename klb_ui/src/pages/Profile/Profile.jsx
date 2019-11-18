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
               <Col xs={7} className="mx-auto my-0">
                  <Card>
                     <CardBody
                        style={{ paddingLeft: "50px", paddingRight: "50px" }}
                     >
                        <Headline>Profile</Headline>
                        <hr
                           style={{ marginBottom: "30px", marginTop: "0px" }}
                        />

                        
                           <Row>
                              <Col sm={3}>
                                 <StyledText>
                                    Username:
                                 </StyledText>
                              </Col>
                              <Col sm={9}>
                                 <StyledText>
                                    {user.username}
                                 </StyledText>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm={3}>
                                 <StyledText>
                                    Firstname:
                                 </StyledText>
                              </Col>
                              <Col sm={9}>
                                 <StyledText>
                                    {user.firstname}
                                 </StyledText>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm={3}>
                                 <StyledText>
                                    Lastname:
                                 </StyledText>
                              </Col>
                              <Col sm={9}>
                                 <StyledText>
                                    {user.lastname}
                                 </StyledText>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm={3}>
                                 <StyledText>
                                    E-mail:
                                 </StyledText>
                              </Col>
                              <Col sm={9}>
                                 <StyledText>
                                    {user.email}
                                 </StyledText>
                              </Col>
                           </Row>
                           <Row>
                              <Col sm={3}>
                                 <StyledText>
                                    Role:
                                 </StyledText>
                              </Col>
                              <Col sm={9}>
                                 <StyledText>
                                    {user.role}
                                 </StyledText>
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
