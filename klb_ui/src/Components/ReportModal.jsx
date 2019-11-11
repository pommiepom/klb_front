import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input, CustomInput } from "reactstrap";

class ReportModal extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      console.log("moooo");
      console.log("props", this.props);
      return (
         <div>
            <Modal
               style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)"
               }}
               isOpen={this.props.isOpen}
            >
               <ModalHeader>Report Post</ModalHeader>
               <ModalBody>
                  <Form>
                     <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                           // onChange={this.myChangeHandler}
                           type="text"
                           name="description"
                           id="description"
                           bsSize="sm"
                           style={{ borderRadius: "7px" }}
                        />
                     </FormGroup>
                  </Form>
               </ModalBody>
               <ModalFooter style={{ borderTop: "none" }}>
                  <Button
                     style={{ backgroundColor: "#fd7e47", border: "none" }}
                     onClick={this.props.nextFnc}
                  >
                     Done
                  </Button>
                  <Button
                     style={{ backgroundColor: "#73777a", border: "none" }}
                     onClick={() => this.props.toggle()}
                  >
                     Cancel
                  </Button>
               </ModalFooter>
            </Modal>
         </div>
      );
   }
}

export default ReportModal;
