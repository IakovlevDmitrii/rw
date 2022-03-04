import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./ArticleEditor.module.scss";

function ArticleEditor({ title, onFormSubmit, defaultValues, hasErrors }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const { fields, remove, append } = useFieldArray({
    name: "tagList",
    control,
  });

  const onArticleCreated = ({ tagList, ...rest }) => {
    const newArticleContent = {
      ...rest,
    };

    // Если есть теги, сохраним их в массив tagsListToSend
    const tagsListToSend = [];
    tagList.forEach(({ value }) => {
      if (value) {
        tagsListToSend.push(value);
      }
    });

    if (tagsListToSend.length) {
      newArticleContent.tagList = tagsListToSend;
    }

    onFormSubmit(newArticleContent);
  };

  const getClassNames = (fieldName) =>
    classNames({
      [styles.error]: errors[fieldName] || hasErrors[fieldName],
    });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>{title}</h3>
          </div>
          <form onSubmit={handleSubmit(onArticleCreated)}>
            <div className={styles.field}>
              <label htmlFor="title">Title</label>
              <input
                className={getClassNames("title")}
                placeholder="Title"
                type="text"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <span>{errors.title.message}</span>}
              {hasErrors.title && <span>Title {hasErrors.title[0]}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="description">Short description</label>
              <input
                className={getClassNames("description")}
                placeholder="Title"
                type="text"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && <span>{errors.description.message}</span>}
              {hasErrors.description && (
                <span>Description {hasErrors.description[0]}</span>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="body">Text</label>
              <textarea
                className={getClassNames("body")}
                rows={7}
                placeholder="Text"
                {...register("body", { required: "Text is required" })}
              />
              {errors.body && <span>{errors.body.message}</span>}
              {hasErrors.body && <span>Description {hasErrors.body[0]}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="tagList">Tags</label>
              <div className={styles.tags}>
                <div className={styles.tagItemsContainer}>
                  {fields.map((field, index) => (
                    <div key={field.id} className={styles.tagItem}>
                      <input
                        type="text"
                        placeholder="Tag"
                        className={styles.tagInput}
                        {...register(`tagList.${index}.value`)}
                      />
                      <button
                        className={styles.deleteTagButton}
                        onClick={() => remove(index)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.addTagButton}
                    type="button"
                    onClick={() => {
                      append({ value: "" });
                    }}
                  >
                    Add tag
                  </button>
                </div>
              </div>
            </div>
            <button className={styles.formButton} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

ArticleEditor.propTypes = {
  title: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })),
  }),
  hasErrors: PropTypes.shape({
    title: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })),
  }),
};

ArticleEditor.defaultProps = {
  defaultValues: {
    tagList: [{ value: "" }],
  },

  hasErrors: {
    title: [""],
    description: "",
    body: "",
    tagList: [{ value: "" }],
  },
};

export default ArticleEditor;
