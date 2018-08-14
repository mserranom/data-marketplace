import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import {
  requestLogin,
  loginFormOpened
} from "../../redux/reducers/login/actions";
import LoginForm from "../components/login/LoginForm";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      usernameInputValue: "",
      passwordInputValue: ""
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
    return (
      <div>
        <Button id="loginButton" color="primary" onClick={this.toggle}>
          Login
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <div id="loginForm">
              <LoginForm
                onLoginClick={(username, password) => {
                  this.props.onLoginClick(username, password);
                }}
                controlsDisabled={this.props.controlsDisabled}
                errorMessage={this.props.errorMessage}
              />
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  modal: PropTypes.bool,

  onLoginClick: PropTypes.func,
  onOpened: PropTypes.func,

  controlsDisabled: PropTypes.bool,
  errorMessage: PropTypes.string
};

const mapStateToProps = state => {
  return {
    modal: !state.login.isLoggedIn,
    controlsDisabled: state.login.isContactingCognito,
    errorMessage: state.login.loginErrorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginClick: (username, password) => {
      dispatch(requestLogin(username, password));
    },
    onOpened: () => {
      dispatch(loginFormOpened());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
