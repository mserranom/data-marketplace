import React from "react";
import PropTypes from "prop-types";
import { Tag } from "./labels/Tag";
import "./FeedCard.css";
import { SubscribeFeedModal } from "./SubcribeFeedModal";
import { UnsubscribeFeedModal } from "./UnsubscribeFeedModal";
import { Button } from "reactstrap";

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
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleSubscribeModal() {
    this.setState({
      subscribeModalIsOpen: !this.state.subscribeModalIsOpen
    });
  }

  toggleUnsubscribeModal() {
    this.setState({
      unsubscribeModalIsOpen: !this.state.unsubscribeModalIsOpen
    });
  }

  renderSubscribeButton() {
    if (this.props.item.isSubscribed === false) {
      return (
        <Button
          onClick={() => this.toggleSubscribeModal()}
          size="sm"
          color="primary"
        >
          Subscribe
        </Button>
      );
    } else if (this.props.item.isSubscribed === true) {
      return (
        <Button
          onClick={() => this.toggleUnsubscribeModal()}
          size="sm"
          color="danger"
        >
          Unsubscribe
        </Button>
      );
    } else {
      return (
        <Button size="sm" color="warning" disabled={true}>
          ?
        </Button>
      );
    }
  }

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
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 10
          }}
        >
          {this.renderSubscribeButton()}

          <SubscribeFeedModal
            feedName={this.props.item.config.name}
            toggle={() => this.toggleSubscribeModal()}
            isOpen={this.state.subscribeModalIsOpen}
            onConfirm={() =>
              this.props.onSubscribeClick(
                this.props.item.user_id,
                this.props.item.id
              )
            }
          />

          <UnsubscribeFeedModal
            feedName={this.props.item.config.name}
            toggle={() => this.toggleUnsubscribeModal()}
            isOpen={this.state.unsubscribeModalIsOpen}
            onConfirm={() =>
              this.props.onUnsubscribeClick(
                this.props.item.user_id,
                this.props.item.id
              )
            }
          />
        </div>
      </div>
    );
  }
}

FeedCard.propTypes = {
  item: PropTypes.object,
  onCategoryClick: PropTypes.func,
  onNameClick: PropTypes.func,
  onSubscribeClick: PropTypes.func,
  onUnsubscribeClick: PropTypes.func
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
  onNameClick: () => {},
  onSubscribeClick: () => {},
  onUnsubscribeClick: () => {}
};
