import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInputValue: "",
      passwordInputValue: ""
    };
  }

  inputsAreFilled() {
    return this.state.usernameInputValue && this.state.passwordInputValue;
  }

  render() {
    const errorAlert = this.props.errorMessage ? (
      <Alert id="loginErrorAlert" color="danger">
        {this.props.errorMessage}
      </Alert>
    ) : (
      <span />
    );
    return (
      <Form>
        <FormGroup>
          <Input
            id="loginUsernameInput"
            type="username"
            bsSize="lg"
            placeholder="username"
            onChange={event => {
              this.setState({
                usernameInputValue: event.target.value
              });
            }}
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="loginPasswordInput"
            type="password"
            placeholder="password"
            bsSize="lg"
            onChange={event => {
              this.setState({
                passwordInputValue: event.target.value
              });
            }}
          />
        </FormGroup>
        <FormGroup>
          <Button
            id="loginProceedButton"
            color="primary"
            block
            disabled={this.props.controlsDisabled || !this.inputsAreFilled()}
            onClick={() => {
              this.props.onLoginClick(
                this.state.usernameInputValue,
                this.state.passwordInputValue
              );
            }}
          >
            LOGIN
          </Button>
        </FormGroup>
        {errorAlert}
      </Form>
    );
  }
}

LoginForm.propTypes = {
  controlsDisabled: PropTypes.bool,
  onLoginClick: PropTypes.func,
  errorMessage: PropTypes.string
};
