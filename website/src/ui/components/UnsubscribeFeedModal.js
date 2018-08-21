import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class UnsubscribeFeedModal extends React.Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            Confirm Subscription Cancelation
          </ModalHeader>
          <ModalBody>
            Are you sure you want to remove your subscription to{" "}
            <strong>{this.props.feedName}</strong>?
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              size="sm"
              onClick={() => {
                this.props.onConfirm();
                this.props.toggle();
              }}
            >
              Unsubscribe
            </Button>
            <Button color="secondary" size="sm" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

UnsubscribeFeedModal.propTypes = {
  feedName: PropTypes.string,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onConfirm: PropTypes.func
};
