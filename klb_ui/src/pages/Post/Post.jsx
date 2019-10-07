import React from "react";
import API from "../../module/api";
import styled from "styled-components";
import moment from "moment";
import { Container, Row, Col } from "reactstrap";
import { Button } from 'reactstrap';
import { FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import File from "../../components/File.jsx"
import Comment from "../../components/Comment.jsx"

const Content = styled.div`
   background-color: #f9f9f9;
   padding: 75px;
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
`

const Span = styled.span`
   display: inline-block;
   width: 5px
`

const StyledP = styled.p`
   font-size: 0.75em;
   display: inline-block;
   margin: 0
`

const StyledDetail = styled.p`
	white-space: pre-wrap;
	display: inline-block;
	font-size: 0.8em;
	margin: 0;
	text-align: justify
`

const StyleCommentsNum = styled.p`
	display: inline-block;
	font-size: 0.8em;
	margin: 0;
	text-Align: center
`

class Post extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			post: "",
			post_id: "",
			username: "",
			like: "",
			files: [],
			comments: []
		}
	}

	static getDerivedStateFromProps(props, state) {
      return {
         post_id: props.match.params.id || ""
      };
	}
	
	componentDidMount () {
		const config = {
			headers: {
				jwt: localStorage.getItem("jwt")
			}
		};
		
		API.get(`/posts/${this.state.post_id}`, config)
			.then(res => {
				const post = res.data[0]
				const username = res.data[0].createdBy.username
				const files = res.data[0].fileID

				this.setState({ post, username, files }, () => {
					
				})
			})
			.catch(err => {
				console.log(err)
			});

		// get likes number
		API.get(`/likes/count`, { params: { postID: this.state.post_id } })
		.then(res => {
			const like = res.data;
			this.setState({ like })
		})
		.catch(err => {
			console.log(err)
		});

		// get comments
		API.get(`/posts/${this.state.post_id}/comments`)
		.then(res => {
			const comments = res.data;
			this.setState({ comments })
		})
		.catch(err => {
			console.log(err)
		});

		// check user
		API.get(`/posts/${this.state.post_id}/checkuser`, config)
		.then(res => {
			console.log(res);
			if(res.data.length !== 0){
				console.log("like");
			}
			else {
				console.log("don't like");
			}
		})
		.catch(err => {
			console.log(err)
		});
	}

	render() {
		const files = this.state.files
		const renderFile = files.map((file, index) => {
			if(files) {
				return <File key={index} file={file} />;
			}
		});
		
		const comments = this.state.comments
		const renderComment = comments.map((comment, index) => {
			return <Comment key={index} index={index} comment={comment} />;
		});

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
										{this.state.username}
										<i>{` - ${moment(this.state.post.date).format("lll")}`}</i>
									</p>
								</Col>
							</Row>
							<hr style={{ marginTop: "5px", marginBottom: "20px" }} />
							<Container>
								<Row>
									<Col>
										<StyledDetail>
											{this.state.post.detail}
										</StyledDetail>
									</Col>
								</Row>
								{ files && 
									<Container style={{ marginTop: "10px", paddingLeft: 0 }}>
										{renderFile}
									</Container>
								}
							</Container>
							<hr style={{ marginTop: "20px", marginBottom: "5px" }} />
							<Row>
								<Col>
									{ 



									}
									<FiHeart style={{ color: "#D62323"}}/>
									<StyledP className="text-center">
										<Span />
										{`${this.state.like} likes`} 
                     		</StyledP> 
								</Col>
								<Col>
									<p style={{ fontSize: "0.75em" }} className="m-0 float-right">
										<i>{`last updated - ${moment(this.state.post.lastUpdated).format("lll")}`}</i>
									</p>
								</Col>
							</Row>
						</StyledPost>
						<Row className="my-4">
							<Col><hr /></Col>
							<Col sm={2} className="mx-auto">
								<StyleCommentsNum>
									{this.state.comments.length} comments
								</StyleCommentsNum>
							</Col>
							<Col><hr /></Col>
						</Row>
						{ comments &&
							<div style={{ borderBottom: "1px solid #b8b8b8"}}>
								{renderComment}
							</div>
						}
					</Col>
				</Row>
			</Content>
		)
	}
}

export default Post