import React from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  NavbarBrand,
  NavLink,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { connect } from "react-redux";
import { requestSignout } from "../../redux/reducers/login/actions";
import { Link } from "react-router-dom";

class HeaderView extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand tag={Link} to="/">
            Data Marketplace
          </NavbarBrand>
          {this.props.isLoggedIn
            ? this.renderLoggedInComponents()
            : this.renderLoggedOutComponents()}
        </Navbar>
      </div>
    );
  }

  renderLoggedOutComponents() {
    return (
      <Nav className="ml-auto" navbar>
        <NavLink tag={Link} to="/explore">
          Explore
        </NavLink>
        <NavLink tag={Link} to="/about">
          About
        </NavLink>
        <NavItem>
          <SignupModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Nav>
    );
  }

  renderLoggedInComponents() {
    return (
      <Nav className="ml-auto" navbar>
        {/* Use of 'tag' attribute for react-router Links:
            https://github.com/reactstrap/reactstrap/issues/298 */}
        <NavLink tag={Link} to="/subscriptions">
          My Subscriptions
        </NavLink>

        <NavLink tag={Link} to="/explore">
          Explore
        </NavLink>

        <NavLink tag={Link} to="/about">
          About
        </NavLink>

        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            {"@" + this.props.username}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem id="signoutLink" onClick={() => this.props.onClick()}>
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  }
}

HeaderView.propTypes = {
  isLoggedIn: PropTypes.bool,
  username: PropTypes.string,
  signout: PropTypes.func
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    username: state.login.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(requestSignout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);
