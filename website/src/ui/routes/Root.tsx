import * as React from "react";
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import HeaderView from "../views/HeaderView";
import Explorer from "../routes/Explorer";
import { Container, Row, Col } from "reactstrap";
import Landing from "./Landing";
import FeedView from "../views/FeedView";
import Subscriptions from "./Subscriptions";
import About from "./About";

type Props = RouteComponentProps<unknown>;

class Root extends React.Component<Props> {
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
                  <Route path="/about" component={About} />
                  <Route path="/subscriptions" component={Subscriptions} />
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

export default withRouter(Root);
