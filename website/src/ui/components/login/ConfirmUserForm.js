import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Input, Form, FormGroup } from "reactstrap";

export default class ConfirmUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationCodeInputValue: ""
    };
  }

  render() {
    const errorAlert = this.props.errorMessage ? (
      <Alert id="signupConfirmationErrorAlert" color="danger">
        {this.props.errorMessage}
      </Alert>
    ) : (
      <span />
    );
    return (
      <div>
        <p>You should have received an email, type a confirmation code:</p>
        <Form>
          <FormGroup>
            <Input
              id="signupConfirmationCodeInput"
              onChange={event => {
                this.setState({
                  confirmationCodeInputValue: event.target.value
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Button
              id="confirmSignupButton"
              block
              color="primary"
              disabled={
                this.props.controlsDisabled ||
                !this.state.confirmationCodeInputValue
              }
              onClick={() => {
                this.props.onConfirmationClick(
                  this.state.confirmationCodeInputValue
                );
              }}
            >
              CONFIRM
            </Button>
          </FormGroup>
          {errorAlert}
        </Form>
      </div>
    );
  }
}

ConfirmUserForm.propTypes = {
  controlsDisabled: PropTypes.bool.isRequired,
  onConfirmationClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};
