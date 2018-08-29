import * as React from "react";
import { connect } from "react-redux";

import FeedListView from "../../ui/views/FeedListView";
import { fetchSubscriptions } from "../../redux/reducers/subscriptions/actions";
import { ConfigData } from "../../redux/types";

interface Props {
  onComponentDidMount: () => void;
  configs: ConfigData[];
}

class Subscriptions extends React.Component<Props> {
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

const mapStateToProps = (state: any) => {
  return {
    configs: state.subscriptions.allSubscriptions
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onComponentDidMount: () => {
      dispatch(fetchSubscriptions());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscriptions);
