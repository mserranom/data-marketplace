import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import {
  requestSignup,
  requestSignupConfirmation,
  signupFormOpened
} from "../../redux/reducers/login/actions";
import SignupUserForm from "./SignupUserForm";
import ConfirmUserForm from "./ConfirmUserForm";

class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      confirmationCodeInputValue: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // Forwarding store values to state, via props
    if (newProps.modal !== this.props.modal) {
      this.setState({ modal: newProps.modal });
    }
  }

  toggle() {
    const willOpen = !this.state.modal;
    this.setState({
      modal: willOpen
    });
    if (willOpen) {
      this.props.onOpened();
    }
  }

  render() {
    const title = this.props.showConfirmationForm
      ? "Confirm Subscription"
      : "Create a New Account";
    const content = this.props.showConfirmationForm
      ? this.renderConfirmationForm()
      : this.renderSignupUserForm();
    return (
      <div>
        <Button id="signupButton" color="primary" onClick={() => this.toggle()}>
          Signup
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>{content}</ModalBody>
        </Modal>
      </div>
    );
  }

  renderSignupUserForm() {
    return (
      <SignupUserForm
        onSignupClick={this.props.onSignupClick}
        controlsDisabled={this.props.controlsDisabled}
        errorMessage={this.props.errorMessage}
      />
    );
  }

  renderConfirmationForm() {
    return (
      <ConfirmUserForm
        onConfirmationClick={code => {
          this.props.onConfirmationClick(code);
        }}
        controlsDisabled={this.props.controlsDisabled}
        errorMessage={this.props.errorMessage}
      />
    );
  }
}

SignupModal.propTypes = {
  modal: PropTypes.bool,

  errorMessage: PropTypes.string,

  showConfirmationForm: PropTypes.bool,
  controlsDisabled: PropTypes.bool,

  onSignupClick: PropTypes.func,
  onConfirmationClick: PropTypes.func
};

SignupModal.defaultProps = {
  modal: true,
  showConfirmationForm: false,
  controlsDisabled: false
};

const mapStateToProps = state => {
  return {
    modal: !state.login.isLoggedIn,
    controlsDisabled: state.login.isContactingCognito,
    showConfirmationForm: state.login.requiresSignupConfirmation === true,
    errorMessage: state.login.signupErrorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignupClick: (username, password, email) => {
      dispatch(requestSignup(username, password, email));
    },

    onConfirmationClick: code => {
      dispatch(requestSignupConfirmation(code));
    },

    onOpened: () => {
      dispatch(signupFormOpened());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);
