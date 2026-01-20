import { FC, JSX, useState } from "react";
import { Flex, Select, Tooltip } from "@mantine/core";
import { DateInput } from "@mantine/dates";
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
  error?: string; // Проп для текста ошибки
}

export const PaymentDocumentInput: FC<IPaymentDocumentInput> = ({
  width,
  title,
  type,
  icon,
  onValueSelect,
  rightText,
  error,
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

  // Вспомогательный класс для подсвечивания ошибок
  const inputErrorClass = error ? styles.inputError : "";

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
              // Добавляем класс ошибки к DateInput
              className={`${styles.input} ${inputErrorClass}`}
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
                  className={`${styles.input} ${inputErrorClass}`}
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
              <span className={styles.rightText}>{rightText}</span>
            </Flex>
          </div>
        );
      }
      case "select": {
        return (
          <div style={{ position: "relative" }}>
            <select
              className={`${styles.input} ${inputErrorClass}`}
              style={{ width: width }}
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
              className={`${styles.textInput} ${inputErrorClass}`}
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
          <Select
            placeholder=""
            data={["EUR • BY11 AKBB 1502 0000 0123 3000 0000"]}
            w={width}
            // Для компонента Mantine используем и класс, и проп error
            className={`${styles.customDropdown} ${inputErrorClass}`}
            error={!!error}
          />
        );
      }
      default: {
        return <></>;
      }
    }
  };

  return (
    <div className={styles.inputBlock}>
      {title && <span style={error ? { color: "red" } : {}}>{title}</span>}

      {/* Обертка для позиционирования иконки ошибки поверх любого инпута */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWithIconWrapper}>{renderInput()}</div>

        {error && (
          <div className={styles.errorIconWrapper}>
            <Tooltip
              label={error}
              withArrow
              position="right-end"
              color="dark"
              multiline
              w={220}
            >
              <div className={styles.errorBadge}>?</div>
            </Tooltip>
          </div>
        )}
      </div>

      <ModalTable
        isOpen={isOpen}
        title={"title"}
        close={() => setIsOpen(false)}
        onValueSelect={handleValueSelect}
      />
    </div>
  );
};
