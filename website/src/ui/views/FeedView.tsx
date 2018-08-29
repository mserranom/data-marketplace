import * as React from "react";
import { connect } from "react-redux";
import { requestFeedToDisplay } from "../../redux/reducers/navigation/actions";
import * as ReactMarkdown from "react-markdown";
import { Badge, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { Tag } from "../components/labels/Tag";
import "./FeedView.css";
import { UserLabel } from "../components/labels/UserLabel";
import { SERVER } from "../../util/constants";
import { withRouter } from "react-router-dom";
import { StateRoot } from "../../redux/types";
import { Dispatch } from "redux";

interface RouteParams {
  user_id: string;
  config_id: string;
}

interface ComponentProps {
  id: string;
  name: string;
  userId: string;
  longDescription: string;
  url: string;
  tags: string[];
}

interface EventProps {
  onComponentDidMount: (userId: string, configId: string) => void;
}

type Props = RouteComponentProps<RouteParams> & ComponentProps & EventProps;

class FeedView extends React.Component<Props> {
  componentDidMount() {
    this.props.onComponentDidMount(
      this.props.match.params.user_id,
      this.props.match.params.config_id
    );
  }

  renderTags() {
    if (this.props.tags) {
      return this.props.tags.map((tag, index) => (
        <div
          className="feed-view-tag"
          key={index}
          onClick={() => this.props.history.push(`/explore/${tag}`)}
        >
          <Tag name={tag.toLowerCase()} />
        </div>
      ));
    } else {
      return [];
    }
  }
  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/explore">Feeds</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{this.props.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="border feed-view-border">
          <h1>{this.props.name}</h1>
          <div className="feed-view-tag-container">{this.renderTags()}</div>
          <div>
            <UserLabel username={this.props.userId} />
          </div>
          <hr />
          <div>
            <ReactMarkdown source={this.props.longDescription} />
          </div>
          <hr />
          <div>
            <h2>Data</h2>
            <ul>
              <li>
                Data Feed:{" "}
                <a href={this.props.url}>{`${SERVER}/feeds/${
                  this.props.userId
                }/${this.props.id}`}</a>
              </li>
              <li>
                Websocket: <Badge color="warning">Coming Soon</Badge>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StateRoot): ComponentProps => {
  if (state.navigation.feedToDisplay) {
    const config = state.navigation.feedToDisplay.config;
    return {
      id: config.id,
      name: config.name,
      userId: state.navigation.feedToDisplay.user_id,
      longDescription: config.long_description,
      url: config.url,
      tags: config.tags
    };
  } else {
    return {
      id: "id",
      name: "name",
      userId: "user_id",
      longDescription: "long_description",
      url: "url",
      tags: ["tag1", "tag2"]
    };
  }
};

const mapDispatchToProps: any = (dispatch: Dispatch<any>): EventProps => {
  return {
    onComponentDidMount: (userId, configId) => {
      dispatch(requestFeedToDisplay(userId, configId));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FeedView)
);
