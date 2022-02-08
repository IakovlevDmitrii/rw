import React, { useState } from 'react';
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

import realWorldApi from '../../../service';
import actionCreators from '../../../store/action-creators';

import Spinner from "../../spinner";
import FormField from './FormField';

import formsConfig from '../utils/formsConfig';
import rules from '../utils/rules';
import styles from '../styles/authComponents.module.scss';

const EditProfile = ({ user, updateUser }) => {
   const { email, username, token } = user;

   const [ isLoading, setIsLoading ] = useState(false);
   const { register, handleSubmit, formState: { errors }, setError } = useForm();

   const onSubmit = (data) => {
      const detailsToChange = {};

      // Если в data есть заполненные поля сохраним их в detailsToChange
      for (const key in data) {
         if(data[key]
            && Object.prototype.hasOwnProperty.call(data,key)){
            detailsToChange[key] = data[key];
         }
      }

      setIsLoading(true);

      realWorldApi
         .authentication
         .edit(token, detailsToChange)
         .then((res) => {
            const userDetails = res.user;
            const serverErrors = res.errors;

            if(userDetails) {
               updateUser(userDetails)
            }

            if(serverErrors) {
               for(const error in serverErrors) {
                  if(Object.prototype.hasOwnProperty.call(serverErrors, error)){
                     setError(error, {
                        type: "manual",
                        message: `${error} ${serverErrors[error][0]}`,
                     });
                  }
               }
            }
         })
         .catch(err => {
            throw new Error(err.message);
         })
         .finally(() => {
            setIsLoading(false);
         })
   };

   const validationRules = {
      username: {
         ...rules.required('Username'),
      },

      email: {
         ...rules.required('Email'),
         ...rules.email(),
      },

      password: {
         ...rules.minMaxLength('Password', 6, 40),
      },

      avatar: {
         ...rules.avatar(),
      }
   };

   const formFields = (formsConfig.editProfile).map((fieldDetails) => {
      const { name } = fieldDetails;
      const addedFieldDetails = fieldDetails;

      if(name === 'username') {
         addedFieldDetails.placeholder = username
      }
      if(name === 'email') {
         addedFieldDetails.placeholder = email
      }

      return (
         <FormField
            {...addedFieldDetails}
            register={register}
            validationRules={validationRules[name]}
            errors={errors}
            key={name}
         />
      )
   });

   if(isLoading) {
      return <Spinner />
   }

   return (
      <section className={styles.section}>
         <div className={styles.container}>
            <div className={styles.content}>
               <div className={styles.title}>
                  <h3>Edit Profile</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  {formFields}
                  <button
                     className={styles.formButton}
                     type='submit'>Save</button>
               </form>
            </div>
         </div>
      </section>
   );
};

EditProfile.propTypes = {
   user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired
   }).isRequired,
   updateUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ authentication }) => ({
   user: authentication.user
});
const mapDispatchToProps = {
   updateUser: actionCreators.authentication.updateUser
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(EditProfile);
