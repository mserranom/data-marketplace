import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

import FeedList2 from "../feed_list/FeedList2";
import { requestAllFeeds } from "../../redux/reducers/navigation/actions";
import { CategoryList } from "./CategoryList";

class Explorer extends React.Component {
  componentDidMount() {
    this.props.onComponentDidMount();
  }

  render() {
    const header = this.props.tag ? this.props.tag : "All";
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <CategoryList
          onCategoryClick={category => this.props.onCategoryClick(category)}
        />
        <div style={{ marginLeft: 60 }}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/explore">Explore</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{header}</BreadcrumbItem>
          </Breadcrumb>
          <FeedList2 feeds={this.props.feeds} />
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
    feeds: state.navigation.allFeeds,
    tag: state.navigation.tag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onComponentDidMount: () => {
      dispatch(requestAllFeeds());
    },
    onCategoryClick: tag => {
      dispatch(requestAllFeeds(tag));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
