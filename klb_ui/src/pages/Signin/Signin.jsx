import React from "react";
import styled from "styled-components";
import API from "../../module/api";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Textfit } from "react-textfit";

const Headline = styled(Textfit)`
   text-align: center;
   font-weight: bold;
   color: #73777a;
   margin: 0 10px 50px 10px;
`;

const ButtonSubmit = styled(Button)`
   font-weight: bold !important;
   background-color: #fd7e47 !important;
   border: none !important;
`;

class Signin extends React.Component {
   constructor(props) {
      super(props);
      this.state = { username: "", password: "", unauthen: false };
   }

   submitHandler = event => {
      event.preventDefault();

      const query = {};
      query.username = this.state.username;
      query.password = this.state.password;

      API.post("/login", query)
         .then(res => {
            if (res && res.data) {
               const token = res.data.token;
               localStorage.setItem("jwt", token || null);
               this.props.history.push("/page/1");
            }
         })
         .catch(err => {
            this.setState({ unauthen: true });
            console.error(err);
         });
   };

   changeHandler = event => {
      let name = event.target.name;
      let val = event.target.value;
      this.setState({ [name]: val });
   };

   render() {
      console.log(this.props);
      const { unauthen } = this.state;
      return (
         <div
            style={{
               height: "100vh",
               width: "100vw",
               backgroundColor: "#F9F9F9"
            }}
         >
            <Container style={{ paddingTop: "25vh" }}>
               <div className="mx-auto my-0" style={{ maxWidth: "400px" }}>
                  <Headline mode="single">KNOWLEDGE BASE</Headline>
               </div>
               <Row>
                  <Col xs={8} className="mx-auto my-0">
                     <Form
                        onSubmit={this.submitHandler}
                        className="mx-auto my-0"
                        style={{ maxWidth: "350px" }}
                     >
                        <FormGroup>
                           <Input
                              onChange={this.changeHandler}
                              type="text"
                              name="username"
                              id="username"
                              placeholder="Usename"
                           />
                        </FormGroup>
                        <FormGroup>
                           <Input
                              onChange={this.changeHandler}
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Password"
                           />
                        </FormGroup>
                        {unauthen && (
                           <p
                              style={{
                                 fontSize: "0.75em",
                                 fontStyle: "italic",
                                 color: "red",
                                 textAlign: "center"
                              }}
                           >
                              The username and password did not match. Please
                              try again.
                           </p>
                        )}
                        <ButtonSubmit type="submit" className="w-100">
                           SIGN IN
                        </ButtonSubmit>
                     </Form>
                  </Col>
               </Row>
            </Container>
         </div>
      );
   }
}

export default Signin;
