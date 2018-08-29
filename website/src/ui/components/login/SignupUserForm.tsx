import * as React from "react";
import { Alert, Button, Form, FormGroup, FormText, Input } from "reactstrap";

interface Props {
  controlsDisabled: boolean;
  onSignupClick: (username: string, password: string, email: string) => void;
  errorMessage: string;
}

interface State {
  usernameInputValue: string;
  passwordInputValue: string;
  emailInputValue: string;
}

export default class SignupUserForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      usernameInputValue: "",
      passwordInputValue: "",
      emailInputValue: ""
    };
  }

  inputsAreFilled() {
    return (
      this.state.usernameInputValue &&
      this.state.emailInputValue &&
      this.state.passwordInputValue
    );
  }

  render() {
    const errorAlert = this.props.errorMessage ? (
      <Alert id="signupErrorAlert" color="danger">
        {this.props.errorMessage}
      </Alert>
    ) : (
      <span />
    );
    return (
      <div id="signupForm">
        <Form>
          <FormGroup>
            <Input
              id="signupUsernameInput"
              placeholder="username"
              onChange={event => {
                this.setState({ usernameInputValue: event.target.value });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="signupUsernamePassword"
              type="password"
              placeholder="password"
              onChange={event => {
                this.setState({ passwordInputValue: event.target.value });
              }}
            />
            <FormText color="muted">
              Passwords must be 8 characters long or over and contain at least
              one symbol, numeric and uppercase characters
            </FormText>
          </FormGroup>
          <FormGroup>
            <Input
              id="signupUsernameEmail"
              type="email"
              placeholder="email"
              onChange={event => {
                this.setState({ emailInputValue: event.target.value });
              }}
            />
          </FormGroup>

          <FormGroup>
            <Button
              id="signupUsernameProceedButton"
              block
              color="primary"
              disabled={this.props.controlsDisabled || !this.inputsAreFilled()}
              onClick={() => {
                this.props.onSignupClick(
                  this.state.usernameInputValue,
                  this.state.passwordInputValue,
                  this.state.emailInputValue
                );
              }}
            >
              SIGN UP
            </Button>
            <FormText color="muted">
              By signing up I accept the <a>terms and conditions</a> of the
              service.
            </FormText>
          </FormGroup>
          {errorAlert}
        </Form>
      </div>
    );
  }
}
