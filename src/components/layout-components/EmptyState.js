import React from "react";
import { Eye } from "../../assets/svg";
import styles from "../../views/styles.module.scss";

export const EmptyEntryWithTitle = ({
  title,
}) => {
  return (
    <div className={styles.transactions__empty} style={{ height: 300 }}>
      <div
        className={styles.transactions__empty__content}
        style={{ marginTop: 60 }}
      >
        <Eye className={styles.transactions__empty__content__eye} />
        <span className={styles.transactions__empty__content__text}>
          No {title} here, yet
        </span>
      </div>
    </div>
  );
};
