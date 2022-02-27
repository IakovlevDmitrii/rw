import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PrivateRoute from "../private-route";

import Header from "../header";
import Articles from "../articles";
import ArticlePage from "../pages/article-page-n";
import NewArticlePage from "../pages/new-article-page";
import { SignIn, SignUp, EditProfile } from "../authComponents";

import styles from "./styles/app.module.scss";

function App({ isLoggedIn, token }) {
  return (
    <div className={styles.content}>
      <Header />
      <Switch>
        <Route path="/articles/:slug">
          <ArticlePage />
        </Route>

        <Route path="/articles">
          <Articles token={token} isLoggedIn={isLoggedIn} />
        </Route>

        <PrivateRoute path="/new-article" auth={isLoggedIn}>
          <NewArticlePage />
        </PrivateRoute>

        <Route path="/sign-in">
          {isLoggedIn ? <Redirect to="/articles" /> : <SignIn />}
        </Route>

        <Route path="/sign-up">
          {isLoggedIn ? <Redirect to="/articles" /> : <SignUp />}
        </Route>

        <Route path="/profile">
          {isLoggedIn ? <EditProfile /> : <Redirect to="/articles" />}
        </Route>

        <Redirect from="/" to="/articles" />
      </Switch>
    </div>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string,
};

App.defaultProps = {
  token: "",
};

const mapStateToProps = ({ authentication }) => ({
  isLoggedIn: authentication.isLoggedIn,
  token: authentication.user.token,
});

export default connect(mapStateToProps)(App);
