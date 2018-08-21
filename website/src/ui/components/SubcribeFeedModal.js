import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class SubscribeFeedModal extends React.Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            Confirm Subscription
          </ModalHeader>
          <ModalBody>
            Are you sure you want to subscribe to{" "}
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
              Subscribe
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

SubscribeFeedModal.propTypes = {
  feedName: PropTypes.string,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onConfirm: PropTypes.func
};
