import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface Props {
  feedName: string;
  isOpen: boolean;
  toggle: () => void;
  onConfirm: () => void;
}

export class SubscribeFeedModal extends React.Component<Props> {
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
