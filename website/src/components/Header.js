import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand, NavLink, Nav, NavItem } from "reactstrap";
import LoginModal from "./login/LoginModal";
import SignupModal from "./login/SignupModal";
import { connect } from "react-redux";
import { requestSignout } from "../redux/reducers/login/actions";
import { Link } from "react-router-dom";

class Header extends React.Component {
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
        <NavLink tag={Link} to="/subscriptions">
          My Subscriptions
        </NavLink>
        <NavLink tag={Link} to="/explore">
          Explore
        </NavLink>
        <NavLink tag={Link} to="/about">
          About
        </NavLink>
        {/* Use of 'tag' attribute for react-router Links:
            https://github.com/reactstrap/reactstrap/issues/298 */}
        <NavLink tag={Link} to="/my_feeds">
          {"@" + this.props.username}
        </NavLink>
        <NavLink id="signoutLink" onClick={() => this.props.onClick()}>
          sign out
        </NavLink>
      </Nav>
    );
  }
}

Header.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
