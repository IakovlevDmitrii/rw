import React from "react";
import PropTypes from "prop-types";
import styles from "./ErrorIndicator.module.scss";

const { section, container, content, title } = styles;

function ErrorIndicator({ errorMessage }) {
  return (
    <section className={section}>
      <div className={container}>
        <div className={content}>
          <div className={title}>
            <span>
              {errorMessage || "Ошибка при получении данных с сервера"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

ErrorIndicator.propTypes = {
  errorMessage: PropTypes.string,
};

ErrorIndicator.defaultProps = {
  errorMessage: "",
};

export default ErrorIndicator;
