import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import actionCreators from "../../../store/action-creators";
import RealWorldApiService from "../../../service";

import ArticleEditor from "../../article-editor";

function NewArticlePage({ token, isLoading }) {
  const [slug, setSlug] = useState("");
  const [hasErrors, setHasErrors] = useState({});

  const getInitialValues = () => ({
    title: "",
    description: "",
    body: "",
    tagList: [{ value: "" }],
  });

  const initialValues = useMemo(() => getInitialValues(), []);

  const [defaultValues, setDefaultValues] = useState(initialValues);

  useEffect(
    () => () => {
      isLoading(false);
      setDefaultValues(initialValues);
      setSlug("");
    },
    [initialValues, isLoading]
  );

  const onSubmit = (newArticleContent) => {
    isLoading(true);

    RealWorldApiService.articles
      .create(token, newArticleContent)
      .then((res) => {
        const articleDetails = res.article;
        const serverErrors = res.errors;

        if (articleDetails) {
          setSlug(articleDetails.slug);
        }

        if (serverErrors) {
          let newDefaultValues = {};

          // tagList в newArticleData это массив строк вида ['a', 'b']
          // а в defaultValues надо сохранить tagList в виде [ {value: 'a'}, {value: 'b'} ]
          if (newArticleContent.tagList) {
            const { tagList, ...rest } = newArticleContent;
            newDefaultValues = { ...rest };

            newDefaultValues.tagList = [];
            tagList.forEach((tag) => {
              newDefaultValues.tagList.push({ value: tag });
            });
          } else {
            newDefaultValues = {
              ...newArticleContent,
              tagList: [{ value: "" }],
            };
          }

          setDefaultValues(newDefaultValues);
          setHasErrors(serverErrors);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  return (
    <Route path="/new-article">
      {slug ? (
        <Redirect to={`/articles/${slug}`} />
      ) : (
        <ArticleEditor
          title="Create new article"
          onFormSubmit={onSubmit}
          defaultValues={defaultValues}
          hasErrors={hasErrors}
        />
      )}
    </Route>
  );
}

NewArticlePage.propTypes = {
  token: PropTypes.string.isRequired,
  isLoading: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authentication }) => ({
  token: authentication.user.token,
});

const mapDispatchToProps = {
  isLoading: actionCreators.loading
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticlePage);
