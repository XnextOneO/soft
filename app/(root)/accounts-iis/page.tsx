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
      firstName: "Zachary Lorem Ipsum",

      lastName: "Davisaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },

    address: "261 Battle Ford",

    city: "Columbus",

    state:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
      "Why do we use it?\n" +
      "\n" +
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
      "Why do we use it?\n" +
      "\n" +
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n",
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

    state:
      "Nebraskaфффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффф",
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
      {
        accessorKey: "state",

        header: "Ключ",
      },
      {
        accessorKey: "state",

        header: "Ключ",
      },
      {
        accessorKey: "state",

        header: "Ключ",
      },
      {
        accessorKey: "state",

        header: "Ключ",
      },
      {
        accessorKey: "state",

        header: "Ключ",
      },
      {
        accessorKey: "state",

        header: "Ключ",
      },
      {
        accessorKey: "state",

        header: "Ключ",

        width: "auto",
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
          width: "90%",
        }}
      >
        <MainTable data={data} columns={columns} isEdit={true} />
      </Container>
    </>
  );
}
