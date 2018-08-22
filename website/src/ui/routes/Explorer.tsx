import * as React from "react";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link, RouteComponentProps } from "react-router-dom";

import FeedListView from "../../ui/views/FeedListView";
import { requestAllFeeds } from "../../redux/reducers/navigation/actions";
import { CategoryList } from "../components/CategoryList";
import { ConfigData } from "../../redux/types";

interface RouteParams {
  tag: string;
}

type Props = RouteComponentProps<RouteParams> & {
  onTagUpdated: (x?: string) => void;
  feeds: ConfigData[];
};

class Explorer extends React.Component<Props> {
  componentDidMount() {
    const tag = this.props.match.params.tag;
    this.props.onTagUpdated(tag);
  }

  componentDidUpdate(prevProps: Props) {
    const prevTag = prevProps.match.params.tag;
    const nextTag = this.props.match.params.tag;
    if (prevTag !== nextTag) {
      this.props.onTagUpdated(nextTag);
    }
  }

  render() {
    const header = this.props.match.params.tag
      ? this.props.match.params.tag
      : "All";
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <CategoryList
          onCategoryClick={category => {
            this.props.history.push(`/explore/${category}`);
          }}
        />
        <div style={{ marginLeft: 60 }}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/explore">Explore</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{header}</BreadcrumbItem>
          </Breadcrumb>
          <FeedListView items={this.props.feeds} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    feeds: state.navigation.allFeeds
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTagUpdated: (tag?: string) => {
      dispatch(requestAllFeeds(tag));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explorer);
