import { JSX } from "react";
import { Card, Group, Modal, Stack } from "@mantine/core";
import { DataField } from "@shared/components/BusinessPartnerInfoModal/DataField.tsx";
import { translateColumns } from "@shared/components/MainTable/MainTable.tsx";

import classes from "../BusinessPartnerInfoModal/BusinessPartnerInfoModal.module.scss";

export interface BusinessPartnerData {
  clientName?: string;
  clientOpenDate?: string;
  clientCloseDate?: string;
  clientShortName?: string;
  clientShortNameLat?: string;
  accOwnerStatus?: string;
  unn?: string;
  inn?: string;
  isResident?: boolean;
  state?: string;
  contractType?: string;
  swiftCode?: string;
  bankBicCode?: string;
  address?: string;
  addressSoato?: string;
  addressState?: string;
  addressPostcode?: string;
  addressRegion?: string;
  addressDistrictName?: string;
  addressUnitaryArea?: string;
  addressSettlementType?: string;
  addressStreetType?: string;
  addressStreetName?: string;
  addressHouseNum?: string;
  addressBuilding?: string;
  addressApartmentNum?: string;
  swiftRusName?: string;
  clientNameEng?: string;
  swiftRusAddress?: string;
  swiftAddress?: string;
  id?: string;
  clientId?: string;
  registrationNumber?: string;
  foreignClientCode?: string;
}

type BusinessPartnerDataKeys = keyof BusinessPartnerData;

export const BusinessPartnerInfoModal = ({
  data,
  opened,
  close,
}: {
  data:
    | {
        data: BusinessPartnerData;
        columnName: Record<string, string>;
      }
    | undefined;
  opened: boolean;
  close: () => void;
}): JSX.Element => {
  const content = data?.data;
  const columnsTranslated = data?.columnName;
  const columnsRaw = content ? Object.keys(content) : [];
  const columns = translateColumns(columnsRaw, columnsTranslated);
  const getColumn = (
    accessorKey: string,
  ): { header: string; accessorKey: string } => {
    const column = columns.find((item) => item.accessorKey === accessorKey);
    return column ?? { header: "", accessorKey: "" };
  };

  return data && content && Object.keys(content).length > 0 ? (
    <Modal
      opened={opened}
      onClose={close}
      title={content.clientName}
      overlayProps={{
        backgroundOpacity: 0.55,
      }}
      centered
      classNames={{
        content: classes.content,
        body: classes.mantineModalBody,
        header: classes.header,
        title: classes.title,
        close: classes.close,
      }}
      size={"80%"}
    >
      <Stack gap={16} p={"20px"}>
        <Card w="100%" p={4} style={{ borderBottom: "1px solid #EBEDF0" }}>
          <Group gap={16}>
            <DataField
              label={getColumn("clientOpenDate")?.header}
              value={
                content[
                  getColumn("clientOpenDate")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("clientCloseDate")?.header}
              value={
                content[
                  getColumn("clientCloseDate")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
          </Group>
        </Card>
        <Card w="100%" p={4} style={{ borderBottom: "1px solid #EBEDF0" }}>
          <Group gap={16}>
            <DataField
              label={getColumn("clientName")?.header}
              value={
                content[
                  getColumn("clientName")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("clientShortName")?.header}
              value={
                content[
                  getColumn("clientShortName")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("clientShortNameLat")?.header}
              value={
                content[
                  getColumn("clientShortNameLat")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
          </Group>
        </Card>
        <Card w="100%" p={4} style={{ borderBottom: "1px solid #EBEDF0" }}>
          <Group gap={16}>
            <DataField
              label={getColumn("accOwnerStatus")?.header}
              value={
                content[
                  getColumn("accOwnerStatus")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("unn")?.header}
              value={
                content[
                  getColumn("unn")?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("inn")?.header}
              value={
                content[
                  getColumn("inn")?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("isResident")?.header}
              value={
                content[
                  getColumn("isResident")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("state")?.header}
              value={
                content[
                  getColumn("state")?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("contractType")?.header}
              value={
                content[
                  getColumn("contractType")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
          </Group>
        </Card>
        <Card w="100%" p={4} style={{ borderBottom: "1px solid #EBEDF0" }}>
          <Group gap={16}>
            <DataField
              label={getColumn("swiftCode")?.header}
              value={
                content[
                  getColumn("swiftCode")?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("bankBicCode")?.header}
              value={
                content[
                  getColumn("bankBicCode")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
          </Group>
        </Card>
        <Card w="100%" p={4} style={{ borderBottom: "1px solid #EBEDF0" }}>
          <Group gap={16}>
            <DataField
              label={getColumn("address")?.header}
              value={
                content[
                  getColumn("address")?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressSoato")?.header}
              value={
                content[
                  getColumn("addressSoato")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressState")?.header}
              value={
                content[
                  getColumn("addressState")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressPostcode")?.header}
              value={
                content[
                  getColumn("addressPostcode")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
          </Group>
        </Card>
        <Card w="100%" p={4} style={{ borderBottom: "1px solid #EBEDF0" }}>
          <Group gap={16}>
            <DataField
              label={getColumn("addressRegion")?.header}
              value={
                content[
                  getColumn("addressRegion")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressDistrictName")?.header}
              value={
                content[
                  getColumn("addressDistrictName")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressUnitaryArea")?.header}
              value={
                content[
                  getColumn("addressUnitaryArea")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressSettlementType")?.header}
              value={
                content[
                  getColumn("addressSettlementType")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressStreetType")?.header}
              value={
                content[
                  getColumn("addressStreetType")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressStreetName")?.header}
              value={
                content[
                  getColumn("addressStreetName")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressHouseNum")?.header}
              value={
                content[
                  getColumn("addressHouseNum")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressBuilding")?.header}
              value={
                content[
                  getColumn("addressBuilding")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("addressApartmentNum")?.header}
              value={
                content[
                  getColumn("addressApartmentNum")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
          </Group>
        </Card>
        <Card w="100%" p={4} style={{ borderBottom: "1px solid #EBEDF0" }}>
          <Group gap={16}>
            <DataField
              label={getColumn("swiftRusName")?.header}
              value={
                content[
                  getColumn("swiftRusName")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("clientNameEng")?.header}
              value={
                content[
                  getColumn("clientNameEng")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
          </Group>
        </Card>
        <Card w="100%" p={4} style={{ borderBottom: "1px solid #EBEDF0" }}>
          <Group gap={16}>
            <DataField
              label={getColumn("swiftRusAddress")?.header}
              value={
                content[
                  getColumn("swiftRusAddress")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("swiftAddress")?.header}
              value={
                content[
                  getColumn("swiftAddress")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
          </Group>
        </Card>
        <Card w="100%" p={4} style={{ borderBottom: "1px solid #EBEDF0" }}>
          <Group gap={16}>
            <DataField
              label={getColumn("id")?.header}
              value={
                content[getColumn("id")?.accessorKey as BusinessPartnerDataKeys]
              }
            />
            <DataField
              label={getColumn("clientId")?.header}
              value={
                content[
                  getColumn("clientId")?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("registrationNumber")?.header}
              value={
                content[
                  getColumn("registrationNumber")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
            <DataField
              label={getColumn("foreignClientCode")?.header}
              value={
                content[
                  getColumn("foreignClientCode")
                    ?.accessorKey as BusinessPartnerDataKeys
                ]
              }
            />
          </Group>
        </Card>
      </Stack>
    </Modal>
  ) : (
    <></>
  );
};
