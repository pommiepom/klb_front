import React from "react";
import $ from "jquery";
import styled from "styled-components";
import API from "../../module/api";
import addFile from "../../module/addFile";
import { Container, Row, Col } from "reactstrap";
import { Card, CardBody } from "reactstrap";
import { Form, FormGroup, Label, Input, CustomInput, Button } from "reactstrap";

import File from "../../components/File.jsx";
import ConfirmModal from "../../components/ConfirmModal";

const Content = styled.div`
   background-color: #f9f9f9;
   padding: 75px;
   color: #73777a;
`;

const Headline = styled.h2`
   font-weight: bold;
`;

const ButtonSubmit = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
   font-weight: bold !important;
   // align-self: center;
   margin-left: auto;
   margin-right: auto;
`;

const ButtonDelete = styled(Button)`
	background-color: #73777a !important;
	padding: 1px 5px !important
	margin-left: auto;
	margin-right: auto;
	font-size: 0.70em !important
	border: none !important;
`;

const config = {
   headers: {
      jwt: localStorage.getItem("jwt")
   }
};

const getPost = postID => {
   return API.get(`/posts/${postID}`, config)
      .then(res => {
         const post = Array.isArray(res.data) ? res.data[0] : res.data;
         return { post };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

const getFiles = postID => {
   return API.get(`/posts/${postID}/files`, config)
      .then(res => {
         const files = res.data
         return { files };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

const getCategory = () => {
   return API.get(`/categories`)
      .then(res => {
         const categories = res.data;
         return { categories };
      })
      .catch(err => {
         console.error(err);
         return err;
      });
};

class NewPost extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         post: "",
         title: "",
         category: "",
         detail: "",
         file: "",
         categories: [],
         files: [],
         modal: false,
         filesLength: 0
      };
      this.myRef = React.createRef();
   }

   componentDidMount() {
      const postID = this.props.match.params.id;

      Promise.all([getPost(postID), getCategory()]).then(values => {
         const props = {};
         const filesLength =  Object.values(values[0])[0].fileID.length;

         values[values.length] = { filesLength };

         for (let i = 0; i < values.length; i++) {
            const key = values[i] ? Object.keys(values[i])[0] : null;
            const val = values[i] ? Object.values(values[i])[0] : null;
            props[key] = val;
         }
         
         this.setState({
            categories: props.categories,
            title: props.post.title,
            category: props.post.category,
            detail: props.post.detail,
            files: props.post.fileID,
            filesLength: props.filesLength
         });
      });
      this.scrollToMyRef()
   }

   componentDidUpdate(prevProps, prevState) {
      if (
         prevState.filesLength !== this.state.filesLength
      ) {
         const postID = this.props.match.params.id;

         Promise.all([getFiles(postID)]).then(values => {
            const props = {};

            for (let i = 0; i < values.length; i++) {
               const key = values[i] ? Object.keys(values[i])[0] : null;
               const val = values[i] ? Object.values(values[i])[0] : null;
               props[key] = val;
            }

            if(!Array.isArray(props.files)){
               props.files = [props.files]
            }

            this.setState({
               files: props.files
            });
         });
         this.scrollToMyRef()
      }
   }

   mySubmitHandler = () => {
      const postID = this.props.match.params.id;
      const { title, category, detail } = this.state
      const data = {
         title: title,
         category: category,
         detail: detail
      }

      API.patch(`/posts/${postID}`, data, config)
         .then(() => {
            this.props.history.push(`/post/${postID}`);
         })
         .catch(err => {
            console.error(err);
         });
   };

   submitFile = event => {
      event.preventDefault();
      const postID = this.props.match.params.id;
		const files = $('#file').prop('files');

      const uploadFilesNum = files.length
      const { filesLength } = this.state

      addFile(postID, files)
      .then(() => {
         this.setState({ filesLength: filesLength + uploadFilesNum, file: null })
      })
      .catch(err => {
         console.error(err);
      })
   };

   myChangeHandler = event => {
      let name = event.target.name;
      let val = event.target.value;
      this.setState({ [name]: val });
   };

   delFile = fileID => {
      const { filesLength } = this.state
      const postID = this.props.match.params.id;

      API.delete(`/posts/${postID}/file/${fileID}`, config)
         .then(() => {
            this.setState({ filesLength: filesLength - 1, modal: false });
         })
         .catch(err => {
            console.log(err);
         });
   };

   toggle = () => {
      this.setState({ modal: !this.state.modal });
   };

   scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

   render() {
      const { categories, files } = this.state;

      const renderCategory = categories.map((category, index) => {
         return (
            <option key={index} value={category.name}>
               {category.name}
            </option>
         );
      });

      const renderFile = files.map((file, index) => {
         return (
            <div
               style={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center"
               }}
               key={index}
            >
               <File file={file} />
               <ButtonDelete
                  className="ml-2"
                  file={file}
                  onClick={() => {
                     this.setState({ fileID: file, modal: true });
                  }}
               >
                  Delete
               </ButtonDelete>
            </div>
         );
      });

      return (
         <Content ref={this.myRef}>
            <Row>
               <Col xs={7} className="mx-auto my-0">
                  <Card>
                     <CardBody
                        style={{ paddingLeft: "50px", paddingRight: "50px" }}
                     >
                        <Headline>Edit Post</Headline>
                        <hr
                           style={{ marginBottom: "30px", marginTop: "0px" }}
                        />

                        <Form>
                           <FormGroup>
                              <Label for="title">Title</Label>
                              <Input
                                 onChange={this.myChangeHandler}
                                 type="text"
                                 name="title"
                                 id="title"
                                 bsSize="sm"
                                 value={this.state.title}
                                 // className="w-50"
                                 style={{ borderRadius: "7px" }}
                              />
                           </FormGroup>

                           <FormGroup>
                              <Label for="category">Category</Label>
                              <Input
                                 onChange={this.myChangeHandler}
                                 type="select"
                                 name="category"
                                 id="category"
                                 bsSize="sm"
                                 className="w-50"
                                 style={{
                                    borderRadius: "7px",
                                    color: "#73777A"
                                 }}
                                 value={this.state.category}
                              >
                                 {renderCategory}
                              </Input>
                           </FormGroup>

                           <FormGroup>
                              <Label for="detail">Detail</Label>
                              <Input
                                 onChange={this.myChangeHandler}
                                 type="textarea"
                                 name="detail"
                                 id="detail"
                                 bsSize="sm"
                                 style={{ borderRadius: "7px" }}
                                 value={this.state.detail}
                              />
                           </FormGroup>
                        </Form>

                        <Form>
                           <FormGroup style={{ display: "inline-block", paddingRight: "20px" }}>
                              <Label for="file">Attachment</Label>
                              <br />
                              <CustomInput
                                 onChange={this.myChangeHandler}
                                 label={this.state.file}
                                 id="file"
                                 name="file"
                                 type="file"
                                 multiple="multiple"
                                 // className="w-50"
                                 bsSize="sm"
                              />
                           </FormGroup>
                           <ButtonSubmit onClick={this.submitFile} style={{ display: "inline-block" }}>Upload</ButtonSubmit>
                        </Form>

                        {files && (
                           <Container
                              style={{ marginTop: "10px", paddingLeft: 0 }}
                           >
                              {renderFile}
                           </Container>
                        )}
                           
                        <Row style={{ paddingTop: "50px"}}>
                           <ButtonSubmit onClick={this.mySubmitHandler}>Done</ButtonSubmit>
                        </Row>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
            
            {this.state.modal && (
               <ConfirmModal
                  isOpen={this.state.modal}
                  nextFnc={() => this.delFile(this.state.fileID)}
                  toggle={() => this.setState({ modal: false })}
                  header={`Delete File`}
                  body={`Are you sure you want to delete this file?`}
                  yes={`Delete`}
               />
            )}
         </Content>
      );
   }
}

export default NewPost;
