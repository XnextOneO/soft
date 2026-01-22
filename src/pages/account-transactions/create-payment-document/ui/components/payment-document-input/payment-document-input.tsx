import { FC, JSX, useEffect, useMemo, useState } from "react";
import { Flex, Select } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import DateIcon from "@public/assets/date-icon.svg";
import CopyIcon from "@public/assets/open-modal-icon.svg";
import { ModalTable } from "@shared/components/ModalTable";

import styles from "./index.module.scss";

interface IPaymentDocumentInput {
  width: number;
  title?: JSX.Element;
  type: "date" | "copy" | "select" | "text" | "dropdown";
  icon: boolean;
  onValueSelect?: (value: string) => void;
  rightText?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const PaymentDocumentInput: FC<IPaymentDocumentInput> = ({
  width,
  title,
  type,
  icon,
  onValueSelect,
  rightText,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value ?? "");

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  const dateValue = useMemo(() => {
    const parsedDate = value ? new Date(value) : undefined;
    return parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate
      : undefined;
  }, [value]);

  const handleChange = (newValue: string): void => {
    setInputValue(newValue);
    onChange?.(newValue);
    onValueSelect?.(newValue);
  };

  const handleValueSelect = (selectedValue: string): void => {
    setInputValue(selectedValue);
    if (onValueSelect) {
      onValueSelect(selectedValue);
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
              value={dateValue}
              onChange={(nextDate: DateValue): void => {
                handleChange(
                  nextDate instanceof Date
                    ? nextDate.toISOString().slice(0, 10)
                    : "",
                );
              }}
            />
            {icon && <img src={DateIcon} className={styles.icon} alt={""} />}
          </div>
        );
      }
      case "copy": {
        return (
          <div style={{ position: "relative" }}>
            <Flex
              gap={"10px"}
              align={"center"}
              style={{ position: "relative" }}
              w={width}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  className={styles.input}
                  style={{ width: width }}
                  value={inputValue}
                  onChange={(event): void => {
                    handleChange(event.target.value);
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
              <span className={styles.rightText}>{rightText}</span>
            </Flex>
          </div>
        );
      }
      case "select": {
        return (
          <div style={{ position: "relative" }}>
            <select
              className={styles.input}
              style={{ width: width }}
              value={inputValue}
              onChange={(event): void => handleChange(event.target.value)}
            >
              <option value="">EUR • BY11 AKBB 1502 0000 0123 3000 0000</option>
            </select>
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
              value={inputValue}
            />
            {icon && <img src={CopyIcon} className={styles.icon} alt={""} />}
          </div>
        );
      }
      case "dropdown": {
        return (
          <>
            <Select
              placeholder=""
              data={["EUR • BY11 AKBB 1502 0000 0123 3000 0000"]}
              w={width}
              className={styles.customDropdown}
              value={inputValue}
              onChange={(nextValue): void => handleChange(nextValue ?? "")}
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
