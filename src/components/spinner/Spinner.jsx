import React from 'react';
import styles from './spinner.module.scss';

const { section, container, content, spinner } = styles;

const Spinner = () => (
   <section className={section}>
      <div className={container}>
         <div className={content}>
            <div className={spinner}>
               <div />
            </div>
         </div>
      </div>
   </section>
);

export default Spinner;
