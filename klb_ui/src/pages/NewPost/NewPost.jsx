import React from "react";
import $ from "jquery";
import styled from "styled-components";
import API from "../../module/api";
import addFile from "../../module/addFile";
// import RichTextEditor from "../../components/RichTextEditor";
import { Row, Col } from "reactstrap";
import { Card, CardBody } from "reactstrap";
import { Form, FormGroup, Label, Input, CustomInput, Button } from "reactstrap";

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
   margin-left: auto;
   margin-right: auto;
   :hover {
      background-color: #f5692c !important;
   }
`;

const config = {
   headers: {
      jwt: localStorage.getItem("jwt")
   }
};

class NewPost extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         title: "",
         category: "",
         detail: "",
         file: "",
         categories: [],
         fileNum: false
      };
   }

   componentDidMount() {
      API.get(`/categories`)
         .then(res => {
            const categories = res.data;

            this.setState({ categories });
         })
         .catch(err => {
            console.error(err);
         });
   }

   submitPost = event => {
      event.preventDefault();

      const files = $("#file").prop("files");
      if (files.length < 6) {
         const formData = new FormData($("form")[0]);
         let data = {};

         for (const [key, value] of formData.entries()) {
            data[key] = value;
         }

         API.post("/posts", data, config).then(doc => {
            const postID = doc.data._id;
            addFile(postID, files)
               .then(() => {
                  this.props.history.push(`/post/${postID}`);
               })
               .catch(err => {
                  console.error(err);
               });
         });
      } else {
         this.setState({ fileNum: true });
      }
   };

   changeHandler = event => {
      let name = event.target.name;
      let val = event.target.value;
      const fileFromInput = $("#file").prop("files")

      if (typeof(fileFromInput) !== 'undefined' && fileFromInput.length !== 0){
         this.setState({ [name]: val, fileLable: `${fileFromInput.length} file` });
      }
      else {
         this.setState({ [name]: val, fileLable: `Choose File` })
      }
   };

   render() {
      const { categories, title, detail, fileNum, fileLable } = this.state;
      const disableButton = { submit: true };

      const renderCategory = categories.map((category, index) => {
         return (
            <option key={index} value={category.name}>
               {category.name}
            </option>
         );
      });

      if (title !== "" && detail !== "") {
         disableButton.submit = false;
      }

      return (
         <Content>
            <Row>
               <Col xs={7} className="mx-auto my-0">
                  <Card>
                     <CardBody
                        style={{ paddingLeft: "50px", paddingRight: "50px" }}
                     >
                        <Headline>New Post</Headline>
                        <hr
                           style={{ marginBottom: "30px", marginTop: "0px" }}
                        />

                        <Form onSubmit={this.submitPost}>
                           <FormGroup>
                              <Label for="title">
                                 Title{" "}
                                 <span style={{ color: "#d11313" }}>*</span>
                              </Label>
                              <Input
                                 onChange={this.changeHandler}
                                 type="text"
                                 name="title"
                                 id="title"
                                 bsSize="sm"
                                 // className="w-50"
                                 style={{ borderRadius: "7px" }}
                              />
                           </FormGroup>

                           <FormGroup>
                              <Label for="category">Category</Label>
                              <Input
                                 onChange={this.changeHandler}
                                 type="select"
                                 name="category"
                                 id="category"
                                 bsSize="sm"
                                 className="w-50"
                                 style={{
                                    borderRadius: "7px",
                                    color: "#73777A"
                                 }}
                              >
                                 {renderCategory}
                              </Input>
                           </FormGroup>

                           <FormGroup>
                              <Label for="detail">
                                 Detail{" "}
                                 <span style={{ color: "#d11313" }}>*</span>
                              </Label>
                              <Input
                                 onChange={this.changeHandler}
                                 type="textarea"
                                 name="detail"
                                 id="detail"
                                 bsSize="sm"
                                 style={{ borderRadius: "7px" }}
                              />
                           </FormGroup>

                           <FormGroup>
                              <Label for="file">
                                 Attachment
                                 {fileNum && (
                                    <p
                                       style={{
                                          color: "#d11313",
                                          display: "inline-block",
                                          fontStyle: "italic",
                                          marginLeft: "5px",
                                          marginBottom: "0px"
                                       }}
                                    >
                                       Can't upload over 5 files.
                                    </p>
                                 )}
                              </Label>
                              <br />

                              <CustomInput
                                 onChange={this.changeHandler}
                                 label={fileLable}
                                 id="file"
                                 name="file"
                                 type="file"
                                 multiple="multiple"
                                 className="w-50"
                                 bsSize="sm"
                              />
                           </FormGroup>

                           {/* <RichTextEditor/> */}

                           <br />
                           <Row>
                              <ButtonSubmit
                                 disabled={disableButton.submit}
                                 type="submit"
                              >
                                 Submit
                              </ButtonSubmit>
                           </Row>
                        </Form>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
         </Content>
      );
   }
}

export default NewPost;
