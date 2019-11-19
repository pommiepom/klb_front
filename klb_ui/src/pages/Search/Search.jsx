import React from "react";
import styled from "styled-components";
import API from "../../module/api";
import { Row, Col } from "reactstrap";
import { Card, CardBody } from "reactstrap";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Content = styled.div`
   background-color: #f9f9f9;
   padding: 75px;
   color: #73777a;
`;

const Headline = styled.h2`
   font-weight: bold;
`;

const StyledLable = styled(Label)`
   font-size: 0.8em !important;
`;

const StyledButton = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
   font-weight: bold !important;
   margin-left: auto;
   margin-right: auto;
   :hover {
      background-color: #f5692c !important;
   }
`;

class Search extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         categories: [],
         title: "",
         category: "",
         fromUser: "",
         fromDate: "",
         toDate: ""
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

   myChangeHandler = event => {
      let name = event.target.name;
      let val = event.target.value;
      this.setState({ [name]: val });
   };

   goToResult = () => {
      const title = this.state.title || null;
      const category = this.state.category || null;
      const fromUser = this.state.fromUser || null;
      const fromDate = this.state.fromDate || null;
      const toDate = this.state.toDate || null;

      const query = { title, category, fromUser, fromDate, toDate };
      let path = "/search/";
      let i = 0;

      for (let key in query) {
         if (i !== 0) {
            path += `&`;
         }
         path += `${key}=`;
         if (query[key]) {
            path += `${query[key]}`;
         }
         i++;
      }

      this.props.history.push(path);
   };

   render() {
      const { categories } = this.state;

      const renderCategory = categories.map((category, index) => {
         return (
            <option key={index} value={category.name}>
               {category.name}
            </option>
         );
      });

      return (
         <Content>
            <Row>
               <Col xs={10} sm={8} md={7} l={6} className="mx-auto my-0">
                  <Card>
                     <CardBody
                        style={{ paddingLeft: "50px", paddingRight: "50px" }}
                     >
                        <Headline>Search</Headline>
                        <hr
                           style={{ marginBottom: "30px", marginTop: "0px" }}
                        />

                        <Form onSubmit={this.mySubmitHandler}>
                           <FormGroup row>
                              <StyledLable for="title" lg={2} className="pr-0">
                                 Title:
                              </StyledLable>
                              <Col xs={12} lg={10}>
                                 <Input
                                    onChange={this.myChangeHandler}
                                    type="text"
                                    name="title"
                                    id="title"
                                    bsSize="sm"
                                    style={{ borderRadius: "7px" }}
                                 />
                              </Col>
                           </FormGroup>

                           <FormGroup row>
                              <StyledLable
                                 for="category"
                                 lg={2}
                                 className="pr-0"
                              >
                                 Category:
                              </StyledLable>
                              <Col xs={12} lg={6}>
                                 <Input
                                    onChange={this.myChangeHandler}
                                    type="select"
                                    name="category"
                                    id="category"
                                    bsSize="sm"
                                    // className="w-50"
                                    style={{
                                       borderRadius: "7px",
                                       color: "#73777A"
                                    }}
                                 >
                                    <option />
                                    {renderCategory}
                                 </Input>
                              </Col>
                           </FormGroup>

                           <FormGroup row>
                              <StyledLable
                                 for="fromUser"
                                 lg={2}
                                 className="pr-0"
                              >
                                 From user:
                              </StyledLable>
                              <Col xs={12} lg={6}>
                                 <Input
                                    onChange={this.myChangeHandler}
                                    type="text"
                                    name="fromUser"
                                    id="fromUser"
                                    bsSize="sm"
                                    // className="w-50"
                                    style={{ borderRadius: "7px" }}
                                 />
                              </Col>
                           </FormGroup>

                           <FormGroup row>
                              <StyledLable
                                 for="fromDate"
                                 lg={2}
                                 xs={12}
                                 className="pr-0"
                              >
                                 From this date:
                              </StyledLable>
                              <Col xs={7} lg={4}>
                                 <Input
                                    onChange={this.myChangeHandler}
                                    type="date"
                                    name="fromDate"
                                    id="fromDate"
                                    bsSize="sm"
                                    style={{ borderRadius: "7px" }}
                                 />
                              </Col>

                              <StyledLable
                                 for="toDate"
                                 lg={2}
                                 xs={12}
                                 // className="text-right"
                              >
                                 To this date:
                              </StyledLable>
                              <Col xs={7} lg={4}>
                                 <Input
                                    onChange={this.myChangeHandler}
                                    type="date"
                                    name="toDate"
                                    id="toDate"
                                    bsSize="sm"
                                    style={{ borderRadius: "7px" }}
                                 />
                              </Col>
                           </FormGroup>

                           <br />
                           <Row>
                              <StyledButton
                                 type="button"
                                 onClick={this.goToResult}
                              >
                                 Search
                              </StyledButton>
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

export default Search;
