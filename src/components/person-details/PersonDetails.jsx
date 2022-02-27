import React from "react";
import PropTypes from "prop-types";
import styles from "./PersonDetails.module.scss";

function PersonDetails({ name, date, src }) {
  return (
    <div className={styles.person}>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        {date && <span>{date}</span>}
      </div>
      <div className={styles.image}>
        <img src={src} alt="user's avatar" />
      </div>
    </div>
  );
}

PersonDetails.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
  src: PropTypes.string.isRequired,
};

PersonDetails.defaultProps = {
  date: "",
};

export default PersonDetails;
