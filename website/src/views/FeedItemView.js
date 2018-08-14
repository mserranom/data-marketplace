import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { requestAllFeeds } from "../redux/reducers/navigation/actions";
import { FeedItem } from "./FeedItem";

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
