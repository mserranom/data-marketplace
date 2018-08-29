import * as React from "react";
import { Alert, Button, Input, Form, FormGroup } from "reactstrap";

interface Props {
  controlsDisabled: boolean;
  onConfirmationClick: (confirmationCode: string) => void;
  errorMessage: string;
}

interface State {
  confirmationCodeInputValue: string;
}

export default class ConfirmUserForm extends React.Component<Props, State> {
  constructor(props: Props) {
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
