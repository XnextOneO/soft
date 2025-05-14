import { JSX, useState } from "react";
import { Button, Combobox, useCombobox } from "@mantine/core";
import IconExport from "@public/assets/export.svg?react";
import { exportData } from "@shared/api/mutation/dataExportAPI.ts";
import { ParametersPost } from "@shared/components/MainTable/MainTable.tsx";
const exports = ["Excel", "Word", "PDF"];

interface DataExportButtonProperties {
  w: number;
  p: number;
  radius: string;
  color: string;
  parameters: ParametersPost;
}

export const DataExportButton = ({
  w,
  p,
  radius,
  color,
  parameters,
}: DataExportButtonProperties): JSX.Element => {
  const [selectedFormat, setSelectedFormat] = useState<string | undefined>();
  const { link } = parameters;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  // eslint-disable-next-line consistent-return
  const exportDataInFormat = async (): Promise<void> => {
    if (link && selectedFormat) {
      return await exportData(parameters, link, selectedFormat);
    }
  };

  const options = exports.map((item) => (
    <Combobox.Option value={item} key={item} onClick={exportDataInFormat}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Combobox
        store={combobox}
        width={65}
        position="bottom-start"
        withArrow
        onOptionSubmit={(value) => {
          setSelectedFormat(value);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Button
            w={w}
            p={p}
            radius={radius}
            color={color}
            onClick={() => combobox.toggleDropdown()}
          >
            <IconExport />
          </Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};
