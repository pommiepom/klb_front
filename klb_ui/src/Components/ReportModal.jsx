import React from "react";
import API from "../module/api";
import styled from "styled-components";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

import ConfirmModal from "./ConfirmModal";

const ButtonYes = styled(Button)`
   background-color: #fd7e47 !important;
   border: none !important;
   :hover {
      background-color: #f5692c !important;
   }
`;

const ButtonNo = styled(Button)`
   background-color: #73777a !important;
   border: none !important;
   :hover {
      background-color: #5d6163 !important;
   }
`;

const config = {
   headers: {
      jwt: localStorage.getItem("jwt")
   }
};

class ReportModal extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         description: "",
         modal: false
      };
   }

   changeHandler = event => {
      let name = event.target.name;
      let val = event.target.value;
      this.setState({ [name]: val });
   };

   submitReport = () => {
      console.log("submit");
      const description = this.state.description;
      const postID = this.props.postID;

      API.post(`/reports/${postID}`, { description }, config)
         .then(() => {
            this.props.toggle();
            this.props.toggleAlert();
         })
         .catch(err => {
            console.error(err);
         });
   };

   render() {
      return (
         <div>
            <ConfirmModal />
            <Modal isOpen={this.props.isOpen}>
               <ModalHeader>Report Post</ModalHeader>
               <ModalBody>
                  <Form>
                     <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                           onChange={this.changeHandler}
                           type="textarea"
                           name="description"
                           id="description"
                           bsSize="sm"
                           style={{ borderRadius: "7px" }}
                        />
                     </FormGroup>
                  </Form>
               </ModalBody>
               <ModalFooter style={{ borderTop: "none" }}>
                  <ButtonYes
                     onClick={() => {
                        this.setState({ modal: true });
                     }}
                  >
                     Done
                  </ButtonYes>
                  <ButtonNo onClick={this.props.toggle}>Cancel</ButtonNo>
               </ModalFooter>
            </Modal>

            {this.state.modal && (
               <ConfirmModal
                  isOpen={this.state.modal}
                  nextFnc={this.submitReport}
                  toggle={() => this.setState({ modal: false })}
                  header={`Report Post`}
                  body={`Are you sure you want to report this post?`}
                  yes={`Yes`}
               />
            )}
         </div>
      );
   }
}

export default ReportModal;
