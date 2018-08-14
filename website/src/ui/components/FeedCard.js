import React from "react";
import PropTypes from "prop-types";
import { Tag } from "./labels/Tag";
import "./FeedCard.css";

const ImgPlaceholder = () => <div className="img-placeholder" />;

const UsernameTag = ({ username }) => (
  <div className="font-weight-light username-tag">
    <i className="fas fa-user" /> {" " + username}
  </div>
);

const IntervalTag = ({ interval }) => (
  <div className="font-weight-light interval-tag">
    <i className="fas fa-clock" />
    {" " + interval}
  </div>
);

export class FeedCard extends React.Component {
  render() {
    const maxTagsToShow = 4;
    const tags = this.props.item.config.tags
      ? this.props.item.config.tags
          .map((tag, index) => (
            // can't set marginRight in Tag for some reason
            <div
              key={index}
              style={{ marginRight: 12 }}
              onClick={() => this.props.onCategoryClick(tag)}
            >
              <Tag name={tag} icon={tag} />
            </div>
          ))
          .slice(0, maxTagsToShow)
      : [];

    return (
      <div
        className="border"
        style={{
          position: "relative",
          borderRadius: 4,
          padding: 10,
          height: 104,
          width: 600
        }}
      >
        <ImgPlaceholder
          style={{
            position: "absolute"
          }}
        />

        <h5 className="feed-name" onClick={() => this.props.onNameClick()}>
          {this.props.item.config.name}
        </h5>

        <div className="tag-container">{tags}</div>

        <UsernameTag username={this.props.item.user_id} />
        <IntervalTag interval={`${this.props.item.config.interval}''`} />
      </div>
    );
  }
}

FeedCard.propTypes = {
  item: PropTypes.object,
  onCategoryClick: PropTypes.func,
  onNameClick: PropTypes.func
};

FeedCard.defaultProps = {
  item: {
    user_id: "user_id",
    config: {
      name: "Feed Name",
      tags: ["Smart City", "Sports", "News", "Government", "Social"],
      interval: 10
    }
  },
  onCategoryClick: () => {},
  onNameClick: () => {}
};
