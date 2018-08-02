import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

export default class FeedList extends React.Component {
  render() {
    const rows = this.props.feeds.map((feed, i) => (
      <tr key={i + 1}>
        <th scope="row">{i + 1}</th>
        <td>{feed.config.name}</td>
        <td>{feed.user_id}</td>
        <td>{feed.config.interval} seconds</td>
      </tr>
    ));
    return (
      <div>
        <Table bordered striped size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Refresh Interval</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  }
}

FeedList.propTypes = {
  onComponentDidMount: PropTypes.func,
  feeds: PropTypes.array.isRequired
};

FeedList.defaultProps = {
  feeds: []
};
