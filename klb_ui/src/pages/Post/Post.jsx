import React from "react";
import API from "../../module/api";
import styled from "styled-components";
import moment from "moment";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import { Badge } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Switch, Route, Link } from "react-router-dom";

import File from "../../components/File.jsx";
import Signin from "../Signin/Signin.jsx";
import Comment from "../../components/Comment.jsx";
import PaginationButton from "../../components/Pagination.jsx";

const Content = styled.div`
	background-color: #f9f9f9;
	padding-bottom: 75px;
	padding-top: 75px;
	color: #73777a;
`;

const StyledPost = styled.div`
	background-color: #ffffff;
	border: 1px solid #b8b8b8;
	padding: 15px 35px;
	color: 73777a;
`;

const Title = styled.p`
	font-weight: bold;
	margin-bottom: 0;
`;
const ButtonEdit = styled(Button)`
	background-color: #fd7e47 !important;
	border: none !important;
	font-weight: bold !important;
	font-size: 0.7em !important;
	border-radius: 25px !important;
	padding-left: 15px !important;
	padding-right: 15px !important;
`;

const Span = styled.span`
	display: inline-block;
	width: 5px;
`;

const StyledP = styled.p`
	font-size: 0.75em;
	display: inline-block;
	margin: 0;
`;

const StyledDetail = styled.p`
	white-space: pre-wrap;
	display: inline-block;
	font-size: 0.8em;
	margin: 0;
	text-align: justify;
`;

const StyleCommentsNum = styled.p`
	display: inline-block;
	font-size: 0.8em;
	margin: 0;
	text-align: center;
`;

const StyledBadge = styled(Badge)`
	color: #ffffff !important;
	background-color: #b5c9d4 !important;
	border: none !important;
	font-weight: normal !important;
	margin-left: 10px !important;
`;

const StyledPagination = styled(Pagination)`
	background-color: transparent;
	border: 0px !important;
	margin-left: auto;
	margin-right: auto;
`;

const StyledItem = styled(PaginationItem)`
	padding: 0;
`;

const StyledLink = styled(PaginationLink)`
	box-shadow: none !important;
	// hover: {
	// 	background-color: #b5c9d4 !important
	// }
`;

const ButtonSubmit = styled(Button)`
	background-color: #fd7e47 !important;
	border: none !important;
	font-weight: bold !important;
	// align-self: center;
	margin-left: auto;
	margin-right: auto;
`;

const StyledTextarea = styled(Input)`
	min-height: 125px;
	box-shadow: none !important;
	:focus {
		border-color: #495057 !important;
	}
`;

const config = {
	headers: {
		jwt: localStorage.getItem("jwt")
	}
};

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			post: "",
			postID: "",
			username: "",
			likeNum: "",
			files: [],
			comments: [],
			liked: false,
			redirect: false,
			commentsLength: 0,
			currentPage: 1,
			commentsPerPage: 10,
			pageLength: 1,
			pageRangeDisplayed: 10
		};
	}

	static getDerivedStateFromProps(props, state) {
		return {
			postID: props.match.params.id || ""
		};
	}

	componentDidMount() {
		const { currentPage, postID } = this.state;

		// this.setState({ currentPage });

		API.get(`/posts/${postID}`, config)
			.then(res => {
				console.log(`api done /posts/${postID}`);
				const post = Array.isArray(res.data) ? res.data[0] : res.data;
				this.setState({ post });
			})
			.catch(err => {
				console.error(err);
			});

		// get likes number
		API.get(`/posts/${postID}/likes/count`)
			.then(res => {
				console.log(`api done /posts/${postID}/likes/count`);
				const likeNum = res.data;
				this.setState({ likeNum });
			})
			.catch(err => {
				console.error(err);
			});

		// check user like
		if (config.headers.jwt) {
			API.get(`/posts/${postID}/checkuser`, config)
				.then(res => {
					res.data.length !== 0
						? this.setState({ liked: true })
						: this.setState({ liked: false });
				})
				.catch(err => {
					console.error(err);
				});
		}

		API.get(`/posts/${postID}/comments/count`).then(res => {
			this.setState({ commentsLength: res.data }, () => {
				this.setState({
					pageLength: Math.ceil(
						this.state.commentsLength / this.state.commentsPerPage
					)
				});
			});
		});

		// get comments
		const limit = this.state.commentsPerPage;
		const skip = (currentPage - 1) * limit;

		API.get(`/posts/${postID}/comments`, { params: { limit, skip } }).then(
			res => {
				const comments = res.data;
				this.setState({ comments });
			}
		);
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log("commentsLength", this.state.commentsLength);
		if (
			prevState.commentsLength !== this.state.commentsLength ||
			prevState.currentPage !== this.state.currentPage
		) {
			const { currentPage, postID } = this.state;

			API.get(`/posts/${postID}`, config)
				.then(res => {
					const post = res.data[0];
					this.setState({ post });
				})
				.catch(err => {
					console.error(err);
				});

			// get likes number
			API.get(`/posts/${postID}/likes/count`)
				.then(res => {
					const likeNum = res.data;
					this.setState({ likeNum });
				})
				.catch(err => {
					console.error(err);
				});

			// check user like
			if (config.headers.jwt) {
				API.get(`/posts/${postID}/checkuser`, config)
					.then(res => {
						res.data.length !== 0
							? this.setState({ liked: true })
							: this.setState({ liked: false });
					})
					.catch(err => {
						console.error(err);
					});
			}

			// get comments
			const limit = this.state.commentsPerPage;
			const skip = (currentPage - 1) * limit;

			API.get(`/posts/${postID}/comments`, { params: { limit, skip } }).then(
				res => {
					const comments = res.data;
					this.setState({ comments });
				}
			);
		}
	}

	myChangeHandler = event => {
		let name = event.target.name;
		let val = event.target.value;
		this.setState({ [name]: val });
	};

	mySubmitHandler = event => {
		event.preventDefault();

		const { comment, postID } = this.state;

		const data = {};
		data.message = comment;
		data.postID = postID;

		console.log(data);

		if (comment !== undefined && comment !== "") {
			API.post("/comments", data, config)
				.then(doc => {
					console.log(doc);
					this.setState(
						{
							commentsLength: this.state.commentsLength + 1
						},
						() => {
							this.setState({
								pageLength: Math.ceil(
									this.state.commentsLength /
										this.state.commentsPerPage
								)
							});
						},
						() => {
							if (this.state.currentPage !== this.state.pageLength) {
								this.setState({ currentPage: this.state.pageLength });
							}
						}
					);
				})
				.catch(err => {
					console.error(err);
				});
		}
	};

	clickLike = () => {
		if (config.headers.jwt) {
			// signed in
			const { likeNum, postID, liked } = this.state;

			if (liked) {
				API.delete(`/likes/post/${postID}`, config)
					.then(() => {
						this.setState({ likeNum: likeNum - 1, liked: !liked });
					})
					.catch(err => {
						console.error(err);
					});
			} else {
				API.post(`/likes`, { postID }, config)
					.then(() => {
						this.setState({ likeNum: likeNum + 1, liked: !liked });
					})
					.catch(err => {
						console.error(err);
					});
			}
		} else {
			this.setState({ redirect: true });
		}
	};

	changePage = currentPage => {
		console.log("currentPage", currentPage);
		console.log("this.state.currentPage", this.state.currentPage);
		if (currentPage !== this.state.currentPage) {
			this.setState({ currentPage }, () => {
				const limit = this.state.commentsPerPage;
				const skip = (currentPage - 1) * limit;
				const postID = this.state.postID;

				API.get(`/posts/${postID}/comments`, {
					params: { limit, skip }
				}).then(res => {
					const comments = res.data;
					this.setState({ comments });
				});
			});
		}
	};

	render() {
		console.log("render");
		const disableButtom = { leftButton: false, rightButton: false };
		const { post, comments, files } = this.state;
		const { redirect, liked, likeNum } = this.state;
		const { currentPage, pageLength, pageRangeDisplayed } = this.state;
		// const cab = post.createdBy
		// console.log("this.state.post.createdBy:", this.state.post.createdBy);
		console.log(typeof this.state.post.createdBy);
		const renderFile = files.map((file, index) => {
			return <File key={index} file={file} />;
		});
		const renderComment = comments.map((comment, index) => {
			return (
				<Comment
					key={index}
					index={index}
					currentPage={currentPage}
					pageRangeDisplayed={pageRangeDisplayed}
					comment={comment}
				/>
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

		const renderPageNumbers = pageNumbers.map((number, index) => {
			return (
				<PaginationButton
					changePage={() => this.changePage(number)}
					key={index}
					number={number}
					currentPage={currentPage}
				/>
			);
		});

		disableButtom.leftButton = currentPage === 1 ? true : false;
		disableButtom.rightButton = currentPage === pageLength ? true : false;

		return (
			<Content>
				<Container fluid>
					<Row>
						<Col xs={10} sm={8} md={7} l={6} className="mx-auto my-0">
							<StyledPost>
								<Row>
									<Col>
										<Title>{post.title}</Title>
									</Col>
									<Col>
										<ButtonEdit size="sm" className="float-right">
											EDIT
										</ButtonEdit>
									</Col>
								</Row>
								<Row>
									<Col>
										<p style={{ fontSize: "0.75em" }} className="m-0">
											{/* {this.state.post.createdBy} */}
											{/* <br></br>
											{JSON.stringify(this.state.post)}
											<br></br>
											{typeof this.state.post} */}
											<i>{` - ${moment(post.date).format(
												"lll"
											)}`}</i>
											<StyledBadge>{post.category}</StyledBadge>
										</p>
									</Col>
								</Row>
								<hr
									style={{ marginTop: "5px", marginBottom: "20px" }}
								/>
								<Container>
									<Row>
										<Col>
											<StyledDetail>{post.detail}</StyledDetail>
										</Col>
									</Row>
									{files && (
										<Container
											style={{ marginTop: "10px", paddingLeft: 0 }}
										>
											{renderFile}
										</Container>
									)}
								</Container>

								<hr
									style={{ marginTop: "20px", marginBottom: "5px" }}
								/>

								<Row>
									<Col>
										{liked ? (
											<FaHeart
												onClick={this.clickLike}
												style={{
													color: "#D62323",
													cursor: "pointer"
												}}
											/>
										) : (
											<FiHeart
												onClick={this.clickLike}
												style={{
													color: "#D62323",
													cursor: "pointer"
												}}
											/>
										)}

										{redirect && (
											<Route path="/signin" component={Signin} />
										)}

										<StyledP className="text-center">
											<Span />
											{`${likeNum} likes`}
										</StyledP>
									</Col>
									<Col>
										<p
											style={{ fontSize: "0.75em" }}
											className="m-0 float-right"
										>
											<i>{`last updated - ${moment(
												this.state.post.lastUpdated
											).format("lll")}`}</i>
										</p>
									</Col>
								</Row>
							</StyledPost>

							<Row className="my-4">
								<Col>
									<hr />
								</Col>
								<Col
									xs={4}
									md={3}
									l={2}
									className="mx-auto text-center"
								>
									<StyleCommentsNum>
										{this.state.commentsLength} comments
									</StyleCommentsNum>
								</Col>
								<Col>
									<hr />
								</Col>
							</Row>

							{comments.length > 0 && (
								<div style={{ borderBottom: "1px solid #b8b8b8" }}>
									{renderComment}
								</div>
							)}

							<br />
							<Container
								fluid
								style={{
									marginLeft: "auto",
									marginRight: "auto",
									width: "auto"
								}}
							>
								<StyledPagination className="d-flex justify-content-center">
									<StyledItem disabled={disableButtom.leftButton}>
										<StyledLink
											first
											onClick={() => this.changePage(1)}
										/>
									</StyledItem>
									<StyledItem disabled={disableButtom.leftButton}>
										<StyledLink
											previous
											onClick={() =>
												this.changePage(this.state.currentPage - 1)
											}
										/>
									</StyledItem>
									{renderPageNumbers}
									<StyledItem disabled={disableButtom.rightButton}>
										<StyledLink
											next
											onClick={() =>
												this.changePage(this.state.currentPage + 1)
											}
										/>
									</StyledItem>
									<StyledItem disabled={disableButtom.rightButton}>
										<StyledLink
											last
											onClick={() =>
												this.changePage(this.state.pageLength)
											}
										/>
									</StyledItem>
								</StyledPagination>
							</Container>

							<Form onSubmit={this.mySubmitHandler}>
								<FormGroup>
									<Label for="comment" className="font-weight-bold">
										New Comment
									</Label>
									<StyledTextarea
										onChange={this.myChangeHandler}
										type="textarea"
										name="comment"
										id="comment"
									/>
								</FormGroup>
								<br />
								<Row>
									<ButtonSubmit type="submit">Submit</ButtonSubmit>
								</Row>
							</Form>
						</Col>
					</Row>
				</Container>
			</Content>
		);
	}
}

export default Post;
