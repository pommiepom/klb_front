import React from "react";
import API from "../../module/api";
import styled from "styled-components";
import { Button, Container, Row, Col } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import PostHome from "../../components/PostHome.jsx";
import PaginationButton from "../../components/Pagination.jsx";

const Content = styled.div`
	background-color: #f9f9f9;
	padding: 75px;
	color: #73777a;
`;

const Headline = styled.h1`
	font-weight: bold;
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
`;

class NewPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			postsLength: 0,
			currentPage: 1,
			postsPerPage: 10,
			pageLength: 1,
			pageRangeDisplayed: 10
		};
	}

	componentDidMount() {
		// this.props.history.goBack()
		// console.log(this.props.history.goBack);
		console.log(this.props.match.params);
		this.setState({ currentPage: Number(this.props.match.params.currentPage || 1) })

		API.get(`/posts/count`).then(res => {
			this.setState({ postsLength: res.data }, () => {
				this.setState({
					pageLength: Math.ceil(
						this.state.postsLength / this.state.postsPerPage
						)
					});
				});
			});
			
		// const query = this.props.match.params.parm.split("&") || this.props.match.params

		// console.log(query);
		// console.log( this.props.match);
		// query.limit = this.state.postsPerPage;
		// query.skip = 0;
		// API.get(`/posts`, { params: query }).then(res => {
		// 	const posts = res.data;
		// 	console.log(posts);
		// 	// this.setState({ posts });
		// });
	}

	routeChange = () => {
		// console.log("route change", this.state.currentPage);
		const path = `/page/${this.state.currentPage}`;
		// console.log(path);
		this.props.history.push(path);
	};

	first = () => {
		this.setState(
			{
				currentPage: 1
			},
			() => {
				const limit = this.state.postsPerPage;
				const skip = (this.state.currentPage - 1) * limit;

				API.get(`/posts`, { params: { limit, skip } }).then(res => {
					const posts = res.data;
					this.setState({ posts });
				});
			}
		);
	};

	previous = () => {
		this.setState(
			{
				currentPage: this.state.currentPage - 1
			},
			() => {
				const limit = this.state.postsPerPage;
				const skip = (this.state.currentPage - 1) * limit;

				API.get(`/posts`, { params: { limit, skip } }).then(res => {
					const posts = res.data;
					this.setState({ posts });
				});

				this.routeChange()
			}
		);
	};

	next = () => {
		this.setState(
			{
				currentPage: this.state.currentPage + 1
			},
			() => {
				const limit = this.state.postsPerPage;
				const skip = (this.state.currentPage - 1) * limit;

				API.get(`/posts`, { params: { limit, skip } }).then(res => {
					const posts = res.data;
					this.setState({ posts });
				});

				this.routeChange()
			}
		);
	};

	last = () => {
		this.setState(
			{
				currentPage: this.state.pageLength
			},
			() => {
				const limit = this.state.postsPerPage;
				const skip = (this.state.currentPage - 1) * limit;

				API.get(`/posts`, { params: { limit, skip } }).then(res => {
					const posts = res.data;
					this.setState({ posts });
				});

				this.routeChange()
			}
		);
	};

	handleClick = event => {
		this.setState({ currentPage: Number(event.target.id) }, () => {
			const limit = this.state.postsPerPage;
			const skip = (this.state.currentPage - 1) * limit;

			API.get(`/posts`, { params: { limit, skip } }).then(res => {
				const posts = res.data;
				this.setState({ posts });
			});

			this.routeChange()
		});
	};

	routeNewPost = () => {
		const path = `/newpost`;
		this.props.history.push(path);
	};

	render() {
		const disableButtom = { leftButton: false, rightButton: false };
		const { posts, currentPage, pageLength, pageRangeDisplayed } = this.state;

		const renderPost = posts.map((post, index) => {
			return <PostHome key={index} post={post} />;
		});

		const pageNumbers = [];

		const calLastPageNum = Math.floor((currentPage - 1) / pageRangeDisplayed) * pageRangeDisplayed + pageRangeDisplayed;
		const firstPageNum = Math.floor((currentPage - 1) / pageRangeDisplayed) * pageRangeDisplayed + 1;
		const lastPageNum = calLastPageNum > pageLength ? pageLength : calLastPageNum;

		for (let i = firstPageNum; i < lastPageNum + 1; i++) {
			pageNumbers.push(i);
		}

		const renderPageNumbers = pageNumbers.map((number, index) => {
			return (
				<PaginationButton
					handleClick={this.handleClick}
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
				<Row>
					<Col xs={7} className="mx-auto my-0">
						<Row>
							<Col>
								<Headline>Search</Headline>
							</Col>
						</Row>
						<div
							style={{
								borderBottom: "1px solid #b8b8b8",
								marginBottom: "50px"
							}}
						>
							{renderPost}
						</div>

						<Container
							fluid
							style={{
								marginLeft: "auto",
								marginRight: "auto",
								width: "auto"
							}}
						>
							<Row>
								<Col style={{ padding: "auto" }}>
									<StyledPagination>
										<StyledItem disabled={disableButtom.leftButton}>
											<StyledLink first onClick={this.first} />
										</StyledItem>
										<StyledItem disabled={disableButtom.leftButton}>
											<StyledLink previous onClick={this.previous} />
										</StyledItem>
										{renderPageNumbers}
										<StyledItem disabled={disableButtom.rightButton}>
											<StyledLink next onClick={this.next} />
										</StyledItem>
										<StyledItem disabled={disableButtom.rightButton}>
											<StyledLink last onClick={this.last} />
										</StyledItem>
									</StyledPagination>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>
			</Content>
		);
	}
}

export default NewPost;