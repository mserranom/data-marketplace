import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { requestAllFeeds } from "../../redux/reducers/navigation/actions";
import { FeedCard } from "../components/FeedCard";

class FeedListView extends React.Component {
  renderFeedCards() {
    if (this.props.items && this.props.items.length > 0) {
      return this.props.items.map((item, i) => (
        <div key={i} style={{ marginBottom: 15 }}>
          <FeedCard
            item={item}
            onCategoryClick={tag => {
              this.props.history.push(`/explore/${tag}`);
              this.props.onCategoryClick(tag);
            }}
            onNameClick={() =>
              this.props.history.push(
                `/user/${item.user_id}/config/${item.config.id}`
              )
            }
          />
        </div>
      ));
    } else {
      return <h5>No items found.</h5>;
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between "
        }}
      >
        {this.renderFeedCards()}
      </div>
    );
  }
}

FeedListView.propTypes = {
  items: PropTypes.array.isRequired
};

FeedListView.defaultProps = {
  items: []
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onCategoryClick: tag => {
      dispatch(requestAllFeeds(tag));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FeedListView)
);
