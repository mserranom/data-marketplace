import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { requestFeedToDisplay } from "../../redux/reducers/navigation/actions";
import ReactMarkdown from "react-markdown";
import { Badge, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { Tag } from "../components/labels/Tag";
import "./FeedView.css";
import { UserLabel } from "../components/labels/UserLabel";
import { SERVER } from "../../util/constants";

class FeedView extends React.Component {
  componentDidMount() {
    this.props.onComponentDidMount(
      this.props.match.params.user_id,
      this.props.match.params.config_id
    );
  }

  renderTags() {
    if (this.props.tags) {
      return this.props.tags.map((tag, index) => (
        <div className="feed-view-tag" key={index}>
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

FeedView.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  userId: PropTypes.string,
  longDescription: PropTypes.string,
  url: PropTypes.string,
  tags: PropTypes.array
};

const mapStateToProps = state => {
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
