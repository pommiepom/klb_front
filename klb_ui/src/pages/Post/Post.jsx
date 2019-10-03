import React from "react";
import API from "../../module/api";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { Button } from 'reactstrap';
import moment from "moment";

const Content = styled.div`
   background-color: #f9f9f9;
   padding: 50px;
   color: #73777a;
`;

const StyledPost = styled.div`
	background-color: #ffffff;
	border: 1px solid #b8b8b8;
	padding: 15px 25px;
	color: 73777a;
`;

const Title = styled.p`
	font-weight: bold;
	margin-bottom: 0
`
const ButtonEdit = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
	font-weight: bold !important;
	font-size: 0.7em !important;
   border-radius: 25px !important;
   padding-left: 15px !important;
   padding-right: 15px !important;
`;

class Post extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			post: "",
         username: ""
		}
	}

	componentDidMount () {
		const config = {
			headers: {
				jwt: localStorage.getItem("jwt")
			}
		};
		
		API.get(`/posts/${this.props.match.params.id}`, config)
			.then(res => {
				const post = res.data[0]
				this.setState({ post })
				this.setState({ username: post.createdBy.username })
			})
			.catch(err => {
				console.log(err)
			});
	}

	render() {
		return (
			<Content>
				<Row>
					<Col xs={7} className="mx-auto my-0">
						<StyledPost>
							<Row>
								<Col>
									<Title>{this.state.post.title}</Title>
								</Col>
								<Col>
									<ButtonEdit size="sm" className="float-right">EDIT</ButtonEdit>
								</Col>
							</Row>
							<Row>
								<Col>
									<p style={{ fontSize: "0.75em" }} className="m-0">
										{`${this.state.username}`}
										<i>{` - ${moment(this.state.post.date).format("lll")}`}</i>
									</p>
								</Col>
							</Row>
							<hr style={{ marginBottom: "30px", marginTop: "15px" }}/>
						</StyledPost>
					</Col>
				</Row>
			</Content>
		)
	}
}

export default Post