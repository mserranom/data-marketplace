import React from "react";
import PropTypes from "prop-types";
import { GREY_DARK, GREY_LIGHT } from "../../util/colors";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { requestAllFeeds } from "../../redux/reducers/navigation/actions";

const Tag = ({ text, icon, onClick }) => (
  <div
    className="font-weight-light"
    style={{
      color: GREY_DARK,
      fontSize: 14,
      cursor: "pointer"
    }}
    onClick={() => onClick()}
  >
    <i className={`fas fa-${icon}`} /> {" " + text}
  </div>
);

const ImgPlaceholder = () => (
  <div
    style={{
      backgroundColor: GREY_LIGHT,
      height: 80,
      width: 80
    }}
  />
);

const UsernameTag = ({ username, top, left }) => (
  <div
    className="font-weight-light"
    style={{
      fontSize: 14,
      position: "absolute",
      top,
      left,
      cursor: "pointer"
    }}
  >
    <i className="fas fa-user" /> {" " + username}
  </div>
);

const IntervalTag = ({ interval, top, left }) => (
  <div
    className="font-weight-light"
    style={{
      fontSize: 14,
      position: "absolute",
      left,
      top
    }}
  >
    <i className="fas fa-clock" />
    {" " + interval}
  </div>
);

class FeedItem extends React.Component {
  render() {
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

        <h5
          style={{
            position: "absolute",
            left: 122,
            top: 10,
            cursor: "pointer"
          }}
          onClick={() =>
            this.props.history.push(
              `/user/${this.props.item.user_id}/config/${
                this.props.item.config.id
              }`
            )
          }
        >
          {this.props.item.config.name}
        </h5>

        <div
          style={{
            position: "absolute",
            left: 140,
            top: 53
          }}
        >
          <Tag
            text="Smart City"
            icon="hospital"
            onClick={() => this.props.onCategoryClick("Smart City")}
          />
        </div>

        <UsernameTag username={this.props.item.user_id} left={300} top={72} />

        <IntervalTag
          left={420}
          top={72}
          interval={`${this.props.item.config.interval}''`}
        />
      </div>
    );
  }
}

FeedItem.propTypes = {
  item: PropTypes.object,
  onCategoryClick: PropTypes.func
};

FeedItem.defaultProps = {};

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
  connect(mapStateToProps, mapDispatchToProps)(FeedItem)
);
