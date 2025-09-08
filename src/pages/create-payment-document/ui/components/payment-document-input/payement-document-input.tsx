import { FC } from "react";
import CopyIcon from "@public/assets/copy-icon.svg";

import styles from "./index.module.scss";

interface IPayementDocumentInput {
  width: number;
  title: string;
  rightSectionText?: string;
  rightSection?: boolean;
}

export const PayementDocumentInput: FC<IPayementDocumentInput> = ({
  width,
  title,
  rightSectionText,
  rightSection,
}) => {
  return (
    <div className={styles.inputBlock}>
      <span>{title}</span>
      <div className={styles.inputWithIconWrapper}>
        <div style={{ position: "relative" }}>
          <input
            type="number"
            className={styles.input}
            style={{ width: width }}
          />
          <img src={CopyIcon} className={styles.icon} alt={""} />
        </div>
        {rightSection ? <span>{rightSectionText}</span> : ""}
      </div>
    </div>
  );
};
