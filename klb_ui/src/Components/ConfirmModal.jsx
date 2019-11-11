import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ConfirmModal extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
		// console.log("props", this.props);
      return (
         <div>
            <Modal isOpen={this.props.isOpen}>
               <ModalHeader>{this.props.header}</ModalHeader>
               <ModalBody>
                  {this.props.body}
               </ModalBody>
               <ModalFooter>
                  <Button color="primary" onClick={this.props.nextFnc}>
                     {this.props.yes}
                  </Button>
                  <Button color="secondary" onClick={() => this.props.toggle()}>
                     Cancel
                  </Button>
               </ModalFooter>
            </Modal>
         </div>
      );
   }
}

export default ConfirmModal;
