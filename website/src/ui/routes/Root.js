import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HeaderView from "../views/HeaderView";
import Explorer from "../routes/Explorer";
import { Container, Row, Col } from "reactstrap";
import Landing from "./Landing";
import FeedView from "../views/FeedView";

class Root extends React.Component {
  render() {
    return (
      <div>
        <HeaderView />
        <div style={{ marginTop: 60 }}>
          <Container>
            <Row>
              <Col md={{ size: 10, offset: 1 }}>
                <Switch>
                  <Route path="/explore/:tag" component={Explorer} />
                  <Route path="/explore" component={Explorer} />
                  <Route
                    path="/user/:user_id/config/:config_id"
                    component={FeedView}
                  />
                  <Route path="/" component={Landing} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

Root.propTypes = {
  shouldLogin: PropTypes.bool
};

const mapStateToProps = state => {
  return { shouldLogin: !state.isLoggedIn };
};

// withRouter required due to https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(connect(mapStateToProps)(Root));
