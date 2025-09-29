import { FC, JSX, useState } from "react";
import { Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import CopyIcon from "@public/assets/copy-icon.svg";
import DateIcon from "@public/assets/date-icon.svg";
import { ModalTable } from "@shared/components/ModalTable";

import styles from "./index.module.scss";

interface IPaymentDocumentInput {
  width: number;
  title?: JSX.Element;
  type: "date" | "copy" | "select" | "text" | "dropdown";
  icon: boolean;
  onValueSelect?: (value: string) => void;
}

export const PaymentDocumentInput: FC<IPaymentDocumentInput> = ({
  width,
  title,
  type,
  icon,
  onValueSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleValueSelect = (value: string): void => {
    setInputValue(value);
    if (onValueSelect) {
      onValueSelect(value);
    }
    setIsOpen(false);
  };

  const renderInput = (): JSX.Element => {
    switch (type) {
      case "date": {
        return (
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
        );
      }
      case "copy": {
        return (
          <div style={{ position: "relative" }}>
            <input
              type="text"
              className={styles.input}
              style={{ width: width }}
              value={inputValue}
              onChange={(event): void => {
                setInputValue(event.target.value);
                if (onValueSelect) {
                  onValueSelect(event.target.value);
                }
              }}
            />
            {icon && (
              <img
                src={CopyIcon}
                className={styles.icon}
                alt={""}
                onClick={() => {
                  setIsOpen(true);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        );
      }
      case "select": {
        return (
          <div style={{ position: "relative" }}>
            <select className={styles.input} style={{ width: width }}></select>
            {icon && <img src={CopyIcon} className={styles.icon} alt={""} />}
          </div>
        );
      }
      case "text": {
        return (
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
        );
      }
      case "dropdown": {
        return (
          <>
            <Select
              placeholder="Выберите значение"
              data={["React", "Angular", "Vue", "Svelte"]}
              w={width}
            />
          </>
        );
      }
      default: {
        return <></>;
      }
    }
  };

  return (
    <div className={styles.inputBlock}>
      <span>{title}</span>
      <div className={styles.inputWithIconWrapper}>{renderInput()}</div>
      <ModalTable
        isOpen={isOpen}
        title={"title"}
        close={() => setIsOpen(false)}
        onValueSelect={handleValueSelect}
      />
    </div>
  );
};
