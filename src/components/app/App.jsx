import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PrivateRoute from "../private-route";

import Header from "../header";
import Articles from "../articles";
import ArticlePage from "../pages/article-page";
import NewArticlePage from "../pages/new-article-page";
import { SignIn, SignUp, EditProfile } from "../authComponents";

import styles from "./styles/app.module.scss";

function App({ isLoggedIn }) {
  return (
    <div className={styles.content}>
      <Header />
      <Switch>
        <Route path="/articles/:slug">
          <ArticlePage />
        </Route>

        <Route path="/articles">
          <Articles />
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
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = ({ authentication }) => ({
  isLoggedIn: authentication.isLoggedIn
});

export default connect(mapStateToProps)(App);
