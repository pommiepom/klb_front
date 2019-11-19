import React from "react";
import styled from "styled-components";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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

class ConfirmModal extends React.Component {
   render() {
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
               <ModalHeader>{this.props.header}</ModalHeader>
               <ModalBody>{this.props.body}</ModalBody>
               <ModalFooter style={{ borderTop: "none" }}>
                  <ButtonYes onClick={this.props.nextFnc}>
                     {this.props.yes}
                  </ButtonYes>
                  <ButtonNo onClick={this.props.toggle}>Cancel</ButtonNo>
               </ModalFooter>
            </Modal>
         </div>
      );
   }
}

export default ConfirmModal;
