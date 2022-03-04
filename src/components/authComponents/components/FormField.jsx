import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "../styles/authComponents.module.scss";

function FormField({
  name,
  label,
  placeholder,
  type,
  register,
  validationRules,
  errors,
  labelBehind,
  extraClassName,
  id,
  autocomplete,
}) {
  const getSubInput = (inputName) =>
    errors[inputName] && <span>{errors[inputName].message}</span>;

  const elements = {
    label: <label htmlFor={name}>{label}</label>,
    input: (
      <input
        className={errors[name] && styles.error}
        placeholder={placeholder}
        type={type}
        {...register(name, { ...validationRules })}
        id={id}
        autoComplete={autocomplete}
      />
    ),
  };

  const elementsToShow = () =>
    labelBehind ? (
      <>
        {elements.input}
        {elements.label}
      </>
    ) : (
      <>
        {elements.label}
        {elements.input}
      </>
    );

  return (
    <div className={classNames(styles.field, extraClassName)}>
      {elementsToShow()}
      {getSubInput(name)}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  validationRules: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  labelBehind: PropTypes.bool,
  extraClassName: PropTypes.string,
  id: PropTypes.string,
  autocomplete: PropTypes.string,
};

FormField.defaultProps = {
  placeholder: null,
  labelBehind: false,
  extraClassName: "",
  id: null,
  autocomplete: "off",
};

export default FormField;
