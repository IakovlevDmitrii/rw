import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorIndicator from '../error-indicator';

export default class ErrorBoundary extends Component {
   state = {
      hasError: false,
   };

   componentDidCatch() {
      this.setState({ hasError: true });
   }

   render() {
      const { hasError } = this.state;
      if (hasError) {
         return <ErrorIndicator />;
      }

      const { children } = this.props;
      return children;
   }
}

ErrorBoundary.propTypes = {
   children: PropTypes.node.isRequired
};