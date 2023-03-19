import React from "react";
import styles from "../styles/Home.module.css";

interface Props {
  pageTitle?: string;
  github?: string;
}

const PageTitle = ({ pageTitle, github }: Props) => {
  return (
    <div className={styles.description}>
      <p>
        Github -&nbsp;
        <code className={styles.code}>{`${github}`}</code>
      </p>
      <div>
        <h1>{`${pageTitle}`}</h1>
      </div>
    </div>
  );
};

export default PageTitle;
