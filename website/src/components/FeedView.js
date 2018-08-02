import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { requestFeedToDisplay } from "../redux/reducers/navigation/actions";
import ReactMarkdown from "react-markdown";
import { Badge, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { Tag } from "./labels/Tag";
import "./FeedView.css";
import { UserLabel } from "./labels/UserLabel";
import { SERVER } from "../util/constants";

class FeedView extends React.Component {
  componentDidMount() {
    this.props.onComponentDidMount(
      this.props.match.params.user_id,
      this.props.match.params.config_id
    );
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
        <div className="border">
          <h1>{this.props.name}</h1>
          <div className="clearfix">
            <div className="tag-container float-left">
              <div className="tag">
                <Tag className="tag" name="weather" />
              </div>
              <div className="tag">
                <Tag name="finance" />
              </div>
              <div className="tag">
                <Tag name="smart city" />
              </div>
              <div className="tag">
                <Tag name="government" />
              </div>
            </div>
            <div className="float-right">
              <div className="tag">
                <UserLabel username={this.props.userId} />
              </div>
            </div>
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

FeedView.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  userId: PropTypes.string,
  longDescription: PropTypes.string,
  url: PropTypes.string
};

const mapStateToProps = state => {
  if (state.navigation.feedToDisplay) {
    const config = state.navigation.feedToDisplay.config;
    return {
      id: config.id,
      name: config.name,
      userId: state.navigation.feedToDisplay.user_id,
      longDescription: config.long_description,
      url: config.url
    };
  }
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onComponentDidMount: (userId, configId) => {
      dispatch(requestFeedToDisplay(userId, configId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
