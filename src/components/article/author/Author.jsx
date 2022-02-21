import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PersonDetails from "../../person-details";

import attention from "./images/attention.svg";
import styles from "./Author.module.scss";

function Author({
                  isPreview,
                  editable,
                  name,
                  date,
                  avatarSrc,
                  onDeleteClick,
                  articleUrl,
                  isPopUpOpen,
                  onNoClick,
                  onYesClick,
}) {
  const popUp = (
    <div className={styles.popUp}>
      <div className={styles.popUpText}>
        <img src={attention} alt="attention" />
        <span>Are you sure to delete this article?</span>
      </div>

      <div className={styles.popUpButtons}>
        <button className={styles.popUpNo} onClick={onNoClick} type="button">
          No
        </button>
        <button className={styles.popUpYes} onClick={onYesClick} type="button">
          Yes
        </button>
      </div>
    </div>
  );

  const buttons = (
    <div className={styles.buttons}>
      <button
        className={styles.deleteArticleButton}
        onClick={onDeleteClick}
        type="button"
      >
        Delete
      </button>

      {isPopUpOpen && popUp}

      <Link to={`${articleUrl}/edit`}>
        <button className={styles.editArticleButton} type="button">
          Edit
        </button>
      </Link>
    </div>
  );

  return (
    <div className={styles.author}>
      <PersonDetails
        name={name}
        date={date}
        src={avatarSrc}
        alt="user's avatar"
      />

      {!isPreview && editable && buttons}
    </div>
  );
}

Author.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatarSrc: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  articleUrl: PropTypes.string.isRequired,
  isPopUpOpen: PropTypes.bool.isRequired,
  onNoClick: PropTypes.func.isRequired,
  onYesClick: PropTypes.func.isRequired,
};

export default Author;
