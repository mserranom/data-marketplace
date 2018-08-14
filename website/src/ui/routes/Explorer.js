import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

import FeedListView from "../../ui/views/FeedListView";
import { requestAllFeeds } from "../../redux/reducers/navigation/actions";
import { CategoryList } from "../components/CategoryList";

class Explorer extends React.Component {
  componentDidMount() {
    const tag = this.props.match.params.tag;
    this.props.onTagUpdated(tag);
  }

  componentDidUpdate(prevProps) {
    const prevTag = prevProps.match.params.tag;
    const nextTag = this.props.match.params.tag;
    if (prevTag !== nextTag) {
      this.props.onTagUpdated(nextTag);
    }
  }

  render() {
    const header = this.props.match.params.tag
      ? this.props.match.params.tag
      : "All";
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <CategoryList
          onCategoryClick={category => {
            this.props.history.push(`/explore/${category}`);
          }}
        />
        <div style={{ marginLeft: 60 }}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/explore">Explore</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{header}</BreadcrumbItem>
          </Breadcrumb>
          <FeedListView items={this.props.feeds} />
        </div>
      </div>
    );
  }
}

Explorer.propTypes = {
  onComponentDidMount: PropTypes.func,
  onCategoryClick: PropTypes.func
};

const mapStateToProps = state => {
  return {
    feeds: state.navigation.allFeeds
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTagUpdated: tag => {
      // tag is optional here
      dispatch(requestAllFeeds(tag));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
