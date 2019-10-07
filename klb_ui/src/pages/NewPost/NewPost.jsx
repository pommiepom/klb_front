import React from "react";
import $ from "jquery";
import styled from "styled-components";
import API from "../../module/api";
import addFile from "../../module/addFile";
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
   // align-self: center;
   margin-left: auto;
   margin-right: auto;
`;

class NewPost extends React.Component {
   constructor(props) {
      super(props);
      this.state = { title: "", category: "", detail: "", file: "" };
   }

   mySubmitHandler = event => {
      event.preventDefault();

      const files = $("#file").prop("files");
      if (files.length < 6) {
         const formData = new FormData($("form")[0]);
         let data = {};

         for (const [key, value] of formData.entries()) {
            data[key] = value;
         }

         let config = {
            headers: {
               jwt: localStorage.getItem("jwt")
            }
         };

         API.post("/posts", data, config)
            .then(doc => {
               const postID = doc.data._id;
               console.log(doc.data);
               addFile(postID);
            })
            .catch(err => {
               console.log(err);
            });
      } else {
         console.log("can't upload over 5 files");
      }
   };

   myChangeHandler = event => {
      let name = event.target.name;
      let val = event.target.value;
      this.setState({ [name]: val });
   };

   render() {
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

                        <Form onSubmit={this.mySubmitHandler}>
                           <FormGroup>
                              <Label for="title">Title</Label>
                              <Input
                                 onChange={this.myChangeHandler}
                                 type="text"
                                 name="title"
                                 id="title"
                                 bsSize="sm"
                                 className="w-50"
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
                              >
                                 <option value="internet">
                                    General > Internet
                                 </option>
                                 <option value="print">
                                    General > Printer
                                 </option>
                                 <option value="pro">
                                    General > Projector
                                 </option>
                              </Input>
                           </FormGroup>

                           <FormGroup>
                              <Label for="detail">Detail</Label>
                              <Input
                                 onChange={this.myChangeHandler}
                                 type="textarea"
                                 name="detail"
                                 id="detail"
                              />
                           </FormGroup>

                           <FormGroup>
                              <Label for="file">Attachment</Label>
                              <br />

                              <CustomInput
                                 onChange={this.myChangeHandler}
                                 label={this.state.file}
                                 id="file"
                                 name="file"
                                 type="file"
                                 multiple="multiple"
                                 className="w-50"
                                 bsSize="sm"
                              />
                           </FormGroup>

                           <br />
                           <Row>
                              <ButtonSubmit type="submit">Submit</ButtonSubmit>
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
