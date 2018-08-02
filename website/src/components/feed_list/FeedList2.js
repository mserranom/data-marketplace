import React from "react";
import PropTypes from "prop-types";
import FeedItem from "./FeedItem";

export default class FeedList2 extends React.Component {
  render() {
    const rows = this.props.feeds.map((feed, i) => (
      <div key={i} style={{ marginBottom: 15 }}>
        <FeedItem item={feed} />
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

FeedList2.propTypes = {
  feeds: PropTypes.array.isRequired
};

FeedList2.defaultProps = {
  feeds: []
};
