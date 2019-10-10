import React from "react";
import API from "../module/api";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";
import { FiHeart } from 'react-icons/fi'
import { FaHeart } from "react-icons/fa";
import { Redirect } from 'react-router-dom'

const StyledComment = styled.div`
	background-color: #ffffff;
	border: 1px solid #b8b8b8;
	border-bottom: 0;
	padding: 15px 35px;
`;

const Title = styled.p`
	font-weight: bold;
	margin-bottom: 0
`
const StyledP = styled.p`
	font-size: 0.75em;
	display: inline-block;
	margin: 0
`
const Span = styled.span`
	display: inline-block;
	width: 5px
`

const config = {
	headers: {
		jwt: localStorage.getItem("jwt")
	}
};

class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentID: "",
			order: "",
			message: "",
			username: "",
			date: "",
			likeNum: 0,
			liked: false,
			redirect: false
		};
	}

	// static getDerivedStateFromProps(props, state) {
	//    return {
	//       comment_id: props.match.params.id || ""
	//    };
	// }

	componentDidMount() {
		const order = this.props.index + 1
		const message = this.props.comment.message
		const username = this.props.comment.createdBy.username
		const date = this.props.comment.date
		const commentID = this.props.comment._id

		this.setState({ commentID, order, message, username, date })

		// get likes number
		API.get(`/likes/count`, { params: { commentID } })
			.then(res => {
				const likeNum = res.data;
				this.setState({ likeNum })
			})
			.catch(err => {
				console.log(err)
			});

		// check user like
		if (config.headers.jwt) {
			API.get(`/comments/${this.props.comment._id}/checkuser`, config)
				.then(res => {
					res.data.length !== 0
						? this.setState({ liked: true })
						: this.setState({ liked: false });
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	clickLike = () => {
		if (config.headers.jwt) { //log in
			const { likeNum } = this.state
			const commentID = this.props.comment._id

			if (this.state.liked) {
				API.delete(`/likes/commentID=${commentID}`, config)
					.then(() => {
						this.setState({ likeNum: likeNum - 1 })
					})
					.catch(err => {
						console.log(err);
					})
			}
			else {
				API.post(`/likes`, { commentID: commentID}, config)
				   .then(() => {
				      this.setState({ likeNum: likeNum + 1 })
				   })
				   .catch(err => {
				      console.log(err)
					});
			}

			this.setState({ liked: !this.state.liked })
		}
		else {
			this.setState({ redirect: true })
		}
	}

	render() {
		const { redirect, liked, likeNum } = this.state;

		return (
			<StyledComment>
				<Title>Comment {this.state.order}</Title>

				<hr style={{ marginTop: "5px", marginBottom: "20px" }} />

				<div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
					<p style={{ textAlign: "justify", fontSize: "0.8em" }}>{this.state.message}</p>
				</div>

				<hr style={{ marginTop: "20px", marginBottom: "5px" }} />

				<Container fluid className="p-0">
					<Row>
						<Col>
							{liked ? (
								<FaHeart onClick={this.clickLike} style={{ color: "#D62323", cursor: "pointer" }} />
							) : (
								<FiHeart onClick={this.clickLike} style={{ color: "#D62323", cursor: "pointer" }} />
							)}

							{redirect &&
								<Redirect to='/signin'/>
							}

							<StyledP>
								<Span /> {`${likeNum} likes`} 
							</StyledP> 
						</Col>
						
						<Col className="text-right">
							<StyledP>
								{this.state.username}<i>{` - ${moment(this.state.date).format("lll")}`}</i>
							</StyledP>
						</Col>
					</Row>
				</Container>

			</StyledComment>
		);
	}
}

export default Comment;
