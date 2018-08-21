import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FeedCard } from "../components/FeedCard";
import {
  subscribe,
  unsubscribe
} from "../../redux/reducers/subscriptions/actions";

class FeedListView extends React.Component {
  renderFeedCards() {
    if (this.props.items && this.props.items.length > 0) {
      return this.props.items.map((item, i) => (
        <div key={i} style={{ marginBottom: 15 }}>
          <FeedCard
            item={item}
            onCategoryClick={tag => {
              this.props.history.push(`/explore/${tag}`);
            }}
            onNameClick={() =>
              this.props.history.push(
                `/user/${item.user_id}/config/${item.config.id}`
              )
            }
            onSubscribeClick={(userId, configId) =>
              this.props.onSubscribeClick(userId, configId)
            }
            onUnsubscribeClick={(userId, configId) =>
              this.props.onUnsubscribeClick(userId, configId)
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
  items: PropTypes.array.isRequired,
  onSubscribeClick: PropTypes.func
};

FeedListView.defaultProps = {
  items: []
};

const mapDispatchToProps = dispatch => {
  return {
    onSubscribeClick: (userId, configId) => {
      dispatch(subscribe(userId, configId));
    },
    onUnsubscribeClick: (userId, configId) => {
      dispatch(unsubscribe(userId, configId));
    }
  };
};

export default withRouter(connect(undefined, mapDispatchToProps)(FeedListView));
