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

const ButtonNewPost = styled(Button)`
	background-color: #fd7e47 !important;
	border: none !important;
	font-weight: bold !important;
	border-radius: 25px !important;
	padding-left: 15px !important;
	padding-right: 15px !important;
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
			currentPage: 0,
			postsPerPage: 10,
			pageLength: 1,
			pageRangeDisplayed: 10
		};
	}

	componentDidMount() {
		this.setState({
			currentPage: Number(this.props.match.params.currentPage)
		});

		if(this.state.currentPage > 0) {
			API.get(`/posts/count`).then(res => {
				this.setState({ postsLength: res.data }, () => {
					this.setState({
						pageLength: Math.ceil(
							this.state.postsLength / this.state.postsPerPage
						)
					});
				});
			});
	
			const limit = this.state.postsPerPage;
			const skip = (this.state.currentPage - 1) * limit;
	
			API.get(`/posts`, { params: { limit, skip } }).then(res => {
				const posts = res.data;
				this.setState({ posts });
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currentPage !== this.state.currentPage) {
			API.get(`/posts/count`).then(res => {
				this.setState({ postsLength: res.data }, () => {
					this.setState({
						pageLength: Math.ceil(
							this.state.postsLength / this.state.postsPerPage
						)
					});
				});
			});

			const limit = this.state.postsPerPage;
			const skip = (this.state.currentPage - 1) * limit;

			API.get(`/posts`, { params: { limit, skip } }).then(res => {
				const posts = res.data;
				this.setState({ posts });
			});
		}
	}

	componentWillReceiveProps(newProps) {
		if(newProps.match.params.currentPage !== this.props.match.params.currentPage) {
			this.setState({
				currentPage: Number(newProps.match.params.currentPage)
			});
		}
	 }

	handleClick = event => {
		const currentPage = Number(event.target.id)
		
		if (currentPage !== this.state.currentPage) {
			this.setState({ currentPage: Number(event.target.id) }, () => {
				this.routeChange();
			});
		}
	};

	changePage = currentPage => {
		this.setState({ currentPage }, () => {
			this.routeChange();
		});
	}

	routeChange = () => {
		const path = `/page/${this.state.currentPage}`;
		this.props.history.push(path);
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
								<Headline>Post</Headline>
							</Col>
							<Col>
								<ButtonNewPost
									className="float-right"
									onClick={this.routeNewPost}
								>
									New Post
								</ButtonNewPost>
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
								<Col>
									<StyledPagination className="d-flex justify-content-center">
										<StyledItem disabled={disableButtom.leftButton}>
											<StyledLink first onClick={() => this.changePage(1)} />
										</StyledItem>
										<StyledItem disabled={disableButtom.leftButton}>
											<StyledLink previous onClick={() => this.changePage(this.state.currentPage - 1)} />
										</StyledItem>
										{renderPageNumbers}
										<StyledItem disabled={disableButtom.rightButton}>
											<StyledLink next onClick={() => this.changePage(this.state.currentPage + 1)} />
										</StyledItem>
										<StyledItem disabled={disableButtom.rightButton}>
											<StyledLink last onClick={() => this.changePage(this.state.pageLength)} />
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
