import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { requestAllFeeds } from "../../redux/reducers/navigation/actions";
import { FeedCard } from "../components/FeedCard";

class FeedListView extends React.Component {
  render() {
    const rows = this.props.items.map((item, i) => (
      <div key={i} style={{ marginBottom: 15 }}>
        <FeedCard
          item={item}
          onCategoryClick={tag => this.onCategoryClick(tag)}
          onNameClick={(userId, configId) =>
            this.props.history.push(
              `/user/${item.user_id}/config/${item.config.id}`
            )
          }
        />
      </div>
    ));
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between "
        }}
      >
        {rows}
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
