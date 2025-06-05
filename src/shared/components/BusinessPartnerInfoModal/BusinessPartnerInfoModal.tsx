import { JSX } from "react";
import { ReactElement } from "react";
import { Card, Group, Modal, Stack } from "@mantine/core";
import { getBPInfo, getColumnsCard } from "@shared/api/mutation/bpAPI.ts";
import { DataField } from "@shared/components/BusinessPartnerInfoModal/DataField.tsx";
import { translateColumns } from "@shared/components/MainTable/MainTable.tsx";
import { useQuery } from "@tanstack/react-query";

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

const renderDataFields = (
  data: BusinessPartnerData,
  keys: BusinessPartnerDataKeys[],
  getColumn: (key: string) => { header: string; accessorKey: string },
): ReactElement[] => {
  return keys.map((key) => (
    <DataField
      key={key}
      label={getColumn(key)?.header}
      value={data[getColumn(key)?.accessorKey as BusinessPartnerDataKeys]}
    />
  ));
};

export const BusinessPartnerInfoModal = ({
  clientId,
  opened,
  close,
}: {
  clientId: number | undefined;
  opened: boolean;
  close: () => void;
}): JSX.Element => {
  const { data: columnsCardData } = useQuery({
    queryKey: ["getColumnsCard", "/business-partner"],
    queryFn: async () => {
      return await getColumnsCard("/business-partner");
    },
  });

  const { data: businessPartnerData } = useQuery({
    queryKey: ["getBusinessPartnerData", clientId],
    queryFn: async () => {
      if (clientId) {
        return await getBPInfo("/business-partner", clientId);
      }
      throw new Error("Данные отсутствуют");
    },
    enabled: !!clientId && opened,
  });

  const columnsTranslated = columnsCardData ?? [];
  const columnsRaw = businessPartnerData
    ? Object.keys(businessPartnerData)
    : [];
  const columns = translateColumns(columnsRaw, columnsTranslated);
  const getColumn = (
    accessorKey: string,
  ): { accessorKey: string; header: string } =>
    columns.find((item) => item.accessorKey === accessorKey) ?? {
      header: "",
      accessorKey: "",
    };

  const cardData = [
    ["clientOpenDate", "clientCloseDate"],
    ["clientName", "clientShortName", "clientShortNameLat"],
    ["accOwnerStatus", "unn", "inn", "isResident", "state", "contractType"],
    ["swiftCode", "bankBicCode"],
    ["address", "addressSoato", "addressState", "addressPostcode"],
    [
      "addressRegion",
      "addressDistrictName",
      "addressUnitaryArea",
      "addressSettlementType",
      "addressStreetType",
      "addressStreetName",
      "addressHouseNum",
      "addressBuilding",
      "addressApartmentNum",
    ],
    ["swiftRusName", "clientNameEng"],
    ["swiftRusAddress", "swiftAddress"],
    ["id", "clientId", "registrationNumber", "foreignClientCode"],
  ];

  return businessPartnerData && Object.keys(businessPartnerData).length > 0 ? (
    <Modal
      opened={opened}
      onClose={close}
      title={businessPartnerData.clientName}
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
        {cardData.map((keys, index) => (
          <Card
            key={index}
            w="100%"
            p={4}
            style={{ borderBottom: "1px solid #EBEDF0" }}
          >
            <Group gap={16}>
              {renderDataFields(
                businessPartnerData,
                keys as BusinessPartnerDataKeys[],
                getColumn,
              )}
            </Group>
          </Card>
        ))}
      </Stack>
    </Modal>
  ) : (
    <></>
  );
};
