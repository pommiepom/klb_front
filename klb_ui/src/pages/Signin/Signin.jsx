import React from "react";
import styled from "styled-components";
import API from '../../module/api';
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Textfit } from 'react-textfit';

const Headline = styled(Textfit)`
	text-align: center;
	font-weight: bold;
	color: #73777A;
	margin: 0 10px 50px 10px;
`

const ButtonSubmit = styled(Button)`
	font-weight: bold !important;
	background-color: #FD7E47 !important;
	border: none !important
`

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '' };
	}

	mySubmitHandler = (event) => {
		event.preventDefault();

		API.post('/login', this.state)
			.then((res) => {
				if(res && res.data) {
					const token = res.data.token
					localStorage.setItem('jwt', token || null)
					this.props.history.push("/");
				}
			})
			.catch(err => {
				console.log(err);
			})
	}

	myChangeHandler = (event) => {
		let name = event.target.name;
		let val = event.target.value;
		this.setState({[name]: val});
	}

	render() {
      return (
			<div style={{ height: "100vh", width: "100vw", backgroundColor: "#F9F9F9" }}>
 				<Container style={{ paddingTop: "25vh" }}>
					<div className="mx-auto my-0" style={{ maxWidth: '400px' }}>
						<Headline mode="single">KNOWLEDGE BASE</Headline>
					</div>
					<Row>
						<Col xs={8} className="mx-auto my-0">
							<Form onSubmit={this.mySubmitHandler} className="mx-auto my-0" style={{ maxWidth: "350px" }}>
								<FormGroup >
									<Input onChange={this.myChangeHandler} type="text" name="username" id="username" placeholder="Usename"/>
								</FormGroup>
								<FormGroup >
										<Input onChange={this.myChangeHandler} type="password" name="password" id="password" placeholder="Password" />
								</FormGroup>
								<ButtonSubmit type='submit' className="w-100">SIGN IN</ButtonSubmit>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
      );
   }
}

export default Signin;