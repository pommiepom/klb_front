import React from "react";
import styled from "styled-components";
import API from "../../module/api";
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

const StyledLable = styled(Label)`
   font-size: 0.8em !important;
`;

const ButtonSubmit = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
   font-weight: bold !important;
   // align-self: center;
   margin-left: auto;
   margin-right: auto;
`;

class Search extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         categories: []
      };
   }

   componentDidMount() {
      API.get(`/categories`)
         .then(res => {
            const categories = res.data;

            this.setState({ categories });
         })
         .catch(err => {
            console.log(err);
         });
   }

   myChangeHandler = event => {
      let name = event.target.name;
      let val = event.target.value;
      this.setState({ [name]: val });
   };

   render() {
      const categories = this.state.categories;

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
               <Col xs={7} className="mx-auto my-0">
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
                              <StyledLable for="title" sm={2} className="pr-0">
                                 Title:
                              </StyledLable>
                              <Col sm={10}>
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
                                 sm={2}
                                 className="pr-0"
                              >
                                 Category:
                              </StyledLable>
                              <Col sm={10}>
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
                                    <option />
                                    {renderCategory}
                                 </Input>
                              </Col>
                           </FormGroup>

                           <FormGroup row>
                              <StyledLable for="from" sm={2} className="pr-0">
                                 From user:
                              </StyledLable>
                              <Col sm={10}>
                                 <Input
                                    onChange={this.myChangeHandler}
                                    type="text"
                                    name="from"
                                    id="from"
												bsSize="sm"
												className="w-50"
                                    style={{ borderRadius: "7px" }}
                                 />
                              </Col>
                           </FormGroup>

                           <FormGroup row>
                              <StyledLable
                                 for="fromDate"
                                 sm={2}
                                 className="pr-0"
                              >
                                 From this date:
                              </StyledLable>
										<Col className="pr-0">
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
                                 sm={2}
											className="text-right"
                              >
                                 To this date:
                              </StyledLable>
										<Col className="pl-0">
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

export default Search;
