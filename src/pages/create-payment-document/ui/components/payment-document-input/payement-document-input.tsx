import { FC } from "react";
import { DateInput } from "@mantine/dates";
import CopyIcon from "@public/assets/copy-icon.svg";
import DateIcon from "@public/assets/date-icon.svg";

import styles from "./index.module.scss";

interface IPayementDocumentInput {
  width: number;
  title: string;
  type: "date" | "copy" | "select" | "text"; // Добавлен тип text
  icon: boolean;
}

export const PaymentDocumentInput: FC<IPayementDocumentInput> = ({
  width,
  title,
  type,
  icon,
}) => {
  return (
    <div className={styles.inputBlock}>
      <span>{title}</span>
      <div className={styles.inputWithIconWrapper}>
        {type === "date" ? (
          <div style={{ position: "relative" }}>
            <DateInput
              valueFormat="DD.MM.YYYY"
              placeholder="Введите дату"
              w={width}
              variant={"unstyled"}
              className={styles.input}
            />
            {icon && <img src={DateIcon} className={styles.icon} alt={""} />}
          </div>
        ) : // eslint-disable-next-line sonarjs/no-nested-conditional
        type === "copy" ? (
          <div style={{ position: "relative" }}>
            <input
              type="text"
              className={styles.input}
              style={{ width: width }}
            />
            {icon && <img src={CopyIcon} className={styles.icon} alt={""} />}
          </div>
        ) : // eslint-disable-next-line sonarjs/no-nested-conditional
        type === "select" ? (
          <div style={{ position: "relative" }}>
            <select className={styles.input} style={{ width: width }}>
              {/* Здесь можно добавить опции для select */}
            </select>
            {icon && <img src={CopyIcon} className={styles.icon} alt={""} />}
          </div>
        ) : // eslint-disable-next-line sonarjs/no-nested-conditional
        type === "text" ? ( // Добавлен блок для типа text
          <div style={{ position: "relative" }}>
            <textarea
              className={styles.textInput}
              style={{ width: width }}
              disabled={true}
              value={
                "Три миллиона девятнадцать тысяч восемьсот шесть российских рублей, 00 копеек"
              }
            />
            {icon && <img src={CopyIcon} className={styles.icon} alt={""} />}
          </div>
        ) : undefined}
      </div>
    </div>
  );
};
