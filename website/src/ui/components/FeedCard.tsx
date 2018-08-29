import * as React from "react";
import { Tag } from "./labels/Tag";
import "./FeedCard.css";
import { SubscribeFeedModal } from "./SubcribeFeedModal";
import { UnsubscribeFeedModal } from "./UnsubscribeFeedModal";
import { Button } from "reactstrap";
import { ConfigData } from "../../redux/types";

const UsernameTag = ({ username }: { username: string }) => (
  <div className="font-weight-light username-tag">
    <i className="fas fa-user" /> {" " + username}
  </div>
);

const IntervalTag = ({ interval }: { interval: string }) => (
  <div className="font-weight-light interval-tag">
    <i className="fas fa-clock" />
    {" " + interval}
  </div>
);

interface Props {
  item: ConfigData;
  onNameClick: () => void;
  onCategoryClick: (tag: string) => void;
  onSubscribeClick: (userId: string, feedId: string) => void;
  onUnsubscribeClick: (userId: string, feedId: string) => void;
}

interface State {
  subscribeModalIsOpen: boolean;
  unsubscribeModalIsOpen: boolean;
}

export class FeedCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { subscribeModalIsOpen: false, unsubscribeModalIsOpen: false };
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
              <Tag name={tag} />
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
        <div
          className="img-placeholder"
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
