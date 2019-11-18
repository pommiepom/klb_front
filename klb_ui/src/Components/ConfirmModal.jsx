import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
						<Button
							style={{ backgroundColor: "#fd7e47", border: "none" }}
							onClick={this.props.nextFnc}
						>
							{this.props.yes}
						</Button>
						<Button
							style={{ backgroundColor: "#73777a", border: "none" }}
							onClick={this.props.toggle}
						>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default ConfirmModal;
