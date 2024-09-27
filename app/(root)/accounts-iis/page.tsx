"use client";
import { useMemo } from "react";
import { Container } from "@mantine/core";
import {
  // eslint-disable-next-line camelcase
  MRT_ColumnDef,
} from "mantine-react-table";

import { MainTable } from "@/components/MainTable/MainTable";
type Person = {
  name: {
    firstName: string;

    lastName: string;
  };

  address: string;

  city: string;

  state: string;
};
const data: Person[] = [
  {
    name: {
      firstName: "Zachary",

      lastName: "Davis",
    },

    address: "261 Battle Ford",

    city: "Columbus",

    state: "Ohio",
  },

  {
    name: {
      firstName: "Robert",

      lastName: "Smith",
    },

    address: "566 Brakus Inlet",

    city: "Westerville",

    state: "West Virginia",
  },

  {
    name: {
      firstName: "Kevin",

      lastName: "Yan",
    },

    address: "7777 Kuhic Knoll",

    city: "South Linda",

    state: "West Virginia",
  },

  {
    name: {
      firstName: "John",

      lastName: "Upton",
    },

    address: "722 Emie Stream",

    city: "Huntington",

    state: "Washington",
  },

  {
    name: {
      firstName: "Nathan",

      lastName: "Harris",
    },

    address: "1 Kuhic Knoll",

    city: "Ohiowa",

    state: "Nebraska",
  },
];
export default function AccountsIIS(): JSX.Element {
  // eslint-disable-next-line camelcase
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name.lastName",

        header: "Номер",
      },

      {
        accessorKey: "name.firstName",

        header: "Наименование",
      },

      {
        accessorKey: "address",

        header: "Область применения",
      },

      {
        accessorKey: "city",

        header: "Формат данных",
      },

      {
        accessorKey: "state",

        header: "Ключ",
      },
    ],

    [],
  );

  return (
    <>
      <Container
        fluid
        style={{
          borderRadius: "4px",
          flexDirection: "row",
          gap: "16px",
          justifyContent: "space-between",
          padding: "10px 10px",
          width: "100%",
        }}
      >
        <MainTable data={data} columns={columns} isEdit={false} />
      </Container>
    </>
  );
}
