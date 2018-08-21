import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import FeedListView from "../../ui/views/FeedListView";
import { fetchSubscriptions } from "../../redux/reducers/subscriptions/actions";

class Subscriptions extends React.Component {
  componentDidMount() {
    this.props.onComponentDidMount();
  }

  renderSubscriptions() {
    if (this.props.configs && this.props.configs.length > 0) {
      return <FeedListView items={this.props.configs} />;
    } else {
      return <p>No subscriptions found.</p>;
    }
  }

  render() {
    return (
      <div>
        <h4>My Subscriptions</h4>
        {this.renderSubscriptions()}
      </div>
    );
  }
}

Subscriptions.propTypes = {
  onComponentDidMount: PropTypes.func
};

const mapStateToProps = state => {
  return {
    configs: state.subscriptions.allSubscriptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onComponentDidMount: () => {
      dispatch(fetchSubscriptions());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
