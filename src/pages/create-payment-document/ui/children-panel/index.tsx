import { FC } from "react";

import styles from "./index.module.scss";

interface IChildrenPanel {
  children: React.ReactElement;
  title: string;
}

export const Index: FC<IChildrenPanel> = ({ children, title }) => {
  return (
    <div className={styles.wrapper}>
      <span>{title}</span>
      {children}
    </div>
  );
};
