import React from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from "styled-components";

const Headline = styled.h1`
text-align: center;
font-weight: bold;
width: 100%;
color: #6c757d;
margin-bottom: 50px;
overflow-wrap: break-word
`;

const Test  = styled.div`
// text-align: center;
// font-weight: bold
`;

const ButtonSubmit = styled(Button)`
	font-weight: bold !important;
	background-color: #FD7E47 !important;
	border: none !important
`

class Signin extends React.Component {
	render() {
      return (
         <Container>
				<Row>
					<Col xs={7} md={5} className="w-50" style={{ margin: "0 auto", marginTop: "20vh" }}>
						<Headline>KNOWLEDGE BASE</Headline>
						
						<Form >
							<FormGroup >
								<Test>
									<Input type="text" name="username" id="username" placeholder="Usename"/>
								</Test>
							</FormGroup>
							<FormGroup >
									<Input type="password" name="password" id="password" placeholder="Password" />
							</FormGroup>
							<ButtonSubmit className="w-100">SIGN IN</ButtonSubmit>
						</Form>
					</Col>
				</Row>
			</Container>
      );
   }
}

export default Signin;