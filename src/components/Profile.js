import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect(
    state=>({
        isAuthenticated: state.auth.authenticated,
        loading: state.user.loading,
        currentUser: state.user.currentUser
    })
)
export default class Profile extends Component {

  render() {
    let { loading, currentUser } = this.props;
      if (loading) {
          return (
              <p className="navbar-text navbar-right">
              Loading...
              </p>
      );
      } else if (currentUser) {
          return (
              <span>
              <p className="navbar-text navbar-right">
              Logged as {currentUser.username}
      &nbsp;&nbsp;
      <Link to="/logout">Log out</Link>
          </p>
          </span>
      );
      }
      return (
          <p className="navbar-text navbar-right">
          <Link to="/login">Log in</Link>
          </p>
  );
  }
}

Profile.propTypes = {
  loading: React.PropTypes.bool,
  currentUser: React.PropTypes.shape({
    username: React.PropTypes.string.isRequired,
  }),
};