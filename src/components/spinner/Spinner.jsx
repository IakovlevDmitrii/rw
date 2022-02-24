import React from "react";
import styles from "./spinner.module.scss";

function Spinner() {
  return (
    <div className={styles.content}>
      <div className={styles.spinner}>
        <div />
      </div>
    </div>
  );
}

export default Spinner;
