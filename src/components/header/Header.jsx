import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import actionCreators from '../../store/action-creators';

import src from './image/User.png';
import styles from './Header.module.scss';

const {
   authButton,
   authButtonActive,
   personInfo,
   personName,
   personImage
} = styles;

const Header = ({ authentication, logOut }) => {

   const getLinksToShow = () => {
      if(authentication.isLoggedIn) {
         const { user } = authentication;

         return (
             <>
               <Link
                  className={styles.createArticleButton}
                  to='/new-article'>
                  Create article
               </Link>
               <Link to='/profile' className={styles.person}>
                  <div className={personInfo}>
                     <div className={personName}>
                        {user.username}
                     </div>
                  </div>
                  <div className={personImage}>
                     <img src={user.image || src} alt="user's avatar" />
                  </div>
               </Link>
               <button
                  type='button'
                  className={authButton}
                  onClick={logOut}>
                  Log Out
               </button>
            </>
         )
      }

      return (
         <>
            <NavLink
               to="/sign-in"
               className={authButton}
               activeClassName={authButtonActive}>
               Sign In
            </NavLink>
            <NavLink
               to="/sign-up"
               className={authButton}
               activeClassName={authButtonActive}>
               Sign Up
            </NavLink>
         </>
      )
   };

   return (
      <header className={styles.header}>
         <div className={styles.container}>
            <div className={styles.content}>
               <Link
                  to='/articles'
                  className={styles.logo}>Realworld blog</Link>
               {getLinksToShow()}
            </div>
         </div>
      </header>
   )
};

Header.propTypes = {
   authentication: PropTypes.shape({
      user: PropTypes.shape({
         username: PropTypes.string,
         image: PropTypes.string,
      }),
      isLoggedIn: PropTypes.bool.isRequired,
   }),
   logOut: PropTypes.func.isRequired,
};

Header.defaultProps = {
   authentication: {
      user: {
         username: '',
         image: '',
      }
   }
};

const mapStateToProps = ({authentication}) => ({authentication});
const mapDispatchToProps = {
   logOut: actionCreators.authentication.logOut,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Header);
