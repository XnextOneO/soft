import { FC, useState } from "react";
import { MantineReactTable } from "mantine-react-table";

interface TableProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  isEdit: boolean;
}

export const MainTable: FC<TableProperties> = ({ data, columns, isEdit }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editedData, setEditedData] = useState(data);

  return (
    <div>
      <MantineReactTable
        columns={columns}
        data={editedData}
        editDisplayMode="modal"
        enableEditing={isEdit}
      />
    </div>
  );
};
