import { FC } from "react";

import styles from "./index.module.scss";

interface IChildrenPanel {
  children: React.ReactElement;
  title: string;
}

export const ChildrenPanel: FC<IChildrenPanel> = ({ children, title }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.blockHeader}>{title}</span>
      {children}
    </div>
  );
};
