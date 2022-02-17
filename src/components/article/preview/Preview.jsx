import React from 'react';
import PropTypes from "prop-types";

import favoriteTrueImage from "./images/favorite-true.png";
import favoriteFalseImage from "./images/favorite-false.png";
import styles from "./Preview.module.scss";

const Preview = ({ title, onFavoriteArticle, favorited, favoritesCount, tagList, description }) => {

    let key = 0;
    const tags = tagList.map((tag) => {
        key = key + 1;

        return(
            <div className={styles.tag} key={key}>
                {tag}
            </div>
        )
    });

    return (
        <div className={styles.article}>
            <div className={styles.info}>
                <div className={styles.title}>
                    <h2>{title}</h2>
                    <div className={styles.favorites}>
                        <button
                            className={styles.favoriteButton}
                            onClick={onFavoriteArticle}
                            type='button'>
                            <img
                                src={favorited ? favoriteTrueImage : favoriteFalseImage}
                                alt='like' />
                        </button>
                        <span className={styles.favoritesCount}>
                            {favoritesCount}
                        </span>
                    </div>
                </div>
                <div className={styles.tags}>
                    {tags}
                </div>
            </div>
            <div className={styles.description}>
                <p>{description}</p>
            </div>
        </div>
    )
};

Preview.propTypes = {
    title: PropTypes.string.isRequired,
    onFavoriteArticle: PropTypes.func.isRequired,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired
}

export default Preview;
