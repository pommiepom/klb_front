import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Textfit } from 'react-textfit';
import styled from "styled-components";

const Headline = styled(Textfit)`
	text-align: center;
	font-weight: bold;
	color: #6c757d;
	margin: 0 10px 50px 10px;
`;

const ButtonSubmit = styled(Button)`
	font-weight: bold !important;
	background-color: #FD7E47 !important;
	border: none !important
`

class Signin extends React.Component {
	render() {
      return (
         <Container style={{ paddingTop: "25vh" }}>
				<div className="mx-auto my-0" style={{ maxWidth: '400px' }}>
					<Headline mode="single" id="headline">KNOWLEDGE BASE</Headline>
				</div>
				<Row>
					<Col xs={8} className="mx-auto my-0">
						<Form style={{ maxWidth: "350px", margin: "0 auto"}}>
							<FormGroup >
								<Input type="text" name="username" id="username" placeholder="Usename"/>
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