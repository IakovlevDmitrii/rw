import React from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../header';
// import HomePage from '../pages/home-page';
import NewArticlePage from '../pages/new-article-page';
import { SignIn, SignUp, EditProfile } from '../authComponents';
import PrivateRoute from '../private-route';

import styles from './styles/app.module.scss';
import ArticlePage from "../pages/article-page";
import ArticleList from "../article-list";

const App = ({ isLoggedIn }) => (
    <div className={styles.content}>
        <Header />
        <Switch>
            <Route path='/articles/:slug'>
                <ArticlePage />
            </Route>

            <Route path='/articles'>
                <ArticleList />
            </Route>

            <PrivateRoute path='/new-article' auth={isLoggedIn}>
                <NewArticlePage />
            </PrivateRoute>

            <Route path='/sign-in'>
                {isLoggedIn ? <Redirect to="/articles" /> : <SignIn />}
            </Route>

            <Route path='/sign-up'>
                {isLoggedIn ? <Redirect to="/articles" /> : <SignUp />}
            </Route>

            <Route path='/profile'>
                {isLoggedIn ? <EditProfile /> : <Redirect to="/articles" />}
            </Route>

            <Redirect from='/' to='/articles' />
        </Switch>
    </div>
);

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = ({ authentication }) => ({
    isLoggedIn: authentication.isLoggedIn
});

export default connect(mapStateToProps)(App);

//             <Route path='/articles'>
//                 <HomePage />
//             </Route>