import React from 'react';
import ReactMarkdown from "react-markdown";
import PropTypes from 'prop-types';

import styles from './Body.module.scss';

const Body = ({ content }) => {
    return (
        <div className={styles.body}>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </div>
    )
};

Body.propTypes = {
    content: PropTypes.string
}

Body.defaultProps = {
    content: ''
}

export default Body;
