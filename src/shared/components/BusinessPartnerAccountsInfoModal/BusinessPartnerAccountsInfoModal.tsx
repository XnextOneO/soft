import React, { JSX, useState } from "react";
import { ReactElement } from "react";
import { Button, Card, Group, Modal, Stack } from "@mantine/core";
import { getColumnsCard, getInfo } from "@shared/api/mutation/bpAPI.ts";
import { BusinessPartnerInfoModal } from "@shared/components/BusinessPartnerInfoModal/BusinessPartnerInfoModal.tsx";
import { DataField } from "@shared/components/BusinessPartnerInfoModal/DataField.tsx";
import { translateColumns } from "@shared/components/MainTable/MainTable.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import classes from "../BusinessPartnerAccountsInfoModal/BusinessPartnerAccountsInfoModal.module.scss";

export interface BusinessPartnerAccountsData {
  ibanAccountNumber: string;
  accountCurrency: string;
  accountDistinguisher: string;
  accountInternalId: string;
  accountStatus: number;
  accountFinancialConditions: string;
  accountOpenDate: string;
  accountCloseDate: string;
  clientId: number;
  accountName: string;
  debitBalance: number;
  debitEquivalentBalance: number;
  creditBalance: number;
  creditEquivalentBalance: number;
  userName: string;
  restrictions: string;
  id: number;
}

type BusinessPartnerAccountsDataKeys = keyof BusinessPartnerAccountsData;

const renderDataFields = (
  data: BusinessPartnerAccountsData,
  keys: BusinessPartnerAccountsDataKeys[],
  getColumn: (key: string) => { header: string; accessorKey: string },
): ReactElement[] => {
  return keys.map((key) => (
    <DataField
      key={key}
      label={getColumn(key)?.header}
      value={
        data[getColumn(key)?.accessorKey as BusinessPartnerAccountsDataKeys]
      }
    />
  ));
};

export const BusinessPartnerAccountsInfoModal = ({
  accountInternalId,
  opened,
  setOpened,
}: {
  accountInternalId: number | undefined;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const queryClient = useQueryClient();

  const { data: columnsCardData } = useQuery({
    queryKey: ["getColumnsCard", "/business-partner-accounts"],
    queryFn: async () => {
      return await getColumnsCard("/business-partner-accounts");
    },
  });

  const { data: businessPartnerAccountsData } = useQuery({
    queryKey: ["getBusinessPartnerAccountsData", accountInternalId],
    queryFn: async () => {
      if (accountInternalId) {
        return await getInfo("/business-partner-accounts", accountInternalId);
      }
      throw new Error("Данные отсутствуют");
    },
    enabled: !!accountInternalId && opened,
  });

  const columnsTranslated = columnsCardData ?? [];
  const columnsRaw = businessPartnerAccountsData
    ? Object.keys(businessPartnerAccountsData)
    : [];
  const columns = translateColumns(columnsRaw, columnsTranslated);
  const getColumn = (
    accessorKey: string,
  ): { accessorKey: string; header: string } =>
    columns.find((item) => item.accessorKey === accessorKey) ?? {
      header: "",
      accessorKey: "",
    };

  const [openedBPInfoModal, setOpenedBPInfoModal] = useState(false);

  const cardData = [
    [
      "ibanAccountNumber",
      "accountCurrency",
      "accountDistinguisher",
      "accountStatus",
      "accountFinancialConditions",
    ],
    ["accountOpenDate", "accountCloseDate", "clientId", "accountName"],
    [
      "debitBalance",
      "debitEquivalentBalance",
      "creditBalance",
      "creditEquivalentBalance",
      "userName",
      "restrictions",
      "id",
    ],
  ];

  const handleCloseBPAInfoModal = (): void => {
    queryClient.setQueryData(
      ["getBusinessPartnerAccountsData", accountInternalId],
      () => {},
    );
    setOpened(false);
  };
  return businessPartnerAccountsData &&
    Object.keys(businessPartnerAccountsData).length > 0 ? (
    <>
      <Modal
        opened={opened}
        onClose={handleCloseBPAInfoModal}
        title={`Счет: ${businessPartnerAccountsData.ibanAccountNumber}`}
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
        <Stack gap={16} p={"16px"}>
          {cardData.map((keys, index) => (
            <Card
              key={index}
              w="100%"
              p={4}
              style={{ borderBottom: "1px solid #EBEDF0" }}
            >
              <Group gap={16}>
                {renderDataFields(
                  businessPartnerAccountsData,
                  keys as BusinessPartnerAccountsDataKeys[],
                  getColumn,
                )}
              </Group>
            </Card>
          ))}
        </Stack>
        <Group gap={8} px={"16px"} py={"8px"}>
          <Button className={classes.button}>Финансовые условия</Button>
          <Button
            className={classes.button}
            onClick={() => {
              if (businessPartnerAccountsData) {
                setOpenedBPInfoModal(!openedBPInfoModal);
              }
            }}
          >
            Деловой партнер
          </Button>
          <Button className={classes.button}>Выписка по счету</Button>
          <Button className={classes.button}>Ограничения по ЛС</Button>
          <Button className={classes.button}>Прочее</Button>
        </Group>
      </Modal>
      <BusinessPartnerInfoModal
        clientId={businessPartnerAccountsData.clientId}
        opened={openedBPInfoModal}
        setOpened={setOpenedBPInfoModal}
      />
    </>
  ) : (
    <></>
  );
};
