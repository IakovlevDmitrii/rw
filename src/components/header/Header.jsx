import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import Spinner from "../spinner";

import actionCreators from "../../store/action-creators";

import src from "./image/User.png";
import styles from "./Header.module.scss";

function Header({ user, isLoggedIn, logOut, isLoading }) {
  const getLinksToShow = () => {
    if (isLoggedIn) {
      return (
        <>
          <Link className={styles.createArticleButton} to="/new-article">
            Create article
          </Link>
          <Link to="/profile" className={styles.person}>
            <div className={styles.personInfo}>
              <div className={styles.personName}>{user.username}</div>
            </div>
            <div className={styles.personImage}>
              <img src={user.image || src} alt="user's avatar" />
            </div>
          </Link>
          <button type="button" className={styles.authButton} onClick={logOut}>
            Log Out
          </button>
        </>
      );
    }

    return (
      <>
        <NavLink
          to="/sign-in"
          className={styles.authButton}
          activeClassName={styles.authButtonActive}
        >
          Sign In
        </NavLink>
        <NavLink
          to="/sign-up"
          className={styles.authButton}
          activeClassName={styles.authButtonActive}
        >
          Sign Up
        </NavLink>
      </>
    );
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <header className={styles.content}>
          <Link to="/articles" className={styles.logo}>
            RealWorld blog
          </Link>
          {getLinksToShow()}
        </header>
      </div>
      <div className={styles.spinnerContainer}>{isLoading && <Spinner />}</div>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  user: {
    username: "",
    image: "",
  },
};

const mapStateToProps = ({ authentication, loading }) => ({
  user: authentication.user,
  isLoggedIn: authentication.isLoggedIn,
  isLoading: loading.isLoading,
});
const mapDispatchToProps = {
  logOut: actionCreators.authentication.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
