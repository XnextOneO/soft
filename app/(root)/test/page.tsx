"use client";

import { useApiData } from "@/app/api/hooks";

function TestPage(): JSX.Element {
  const parameters = {
    page: 1,
    size: 10,
    sort: "ASC",
    column: "DIGITAL_CURRENCY_CODE",
  };
  const { data, error, isLoading } = useApiData(parameters);
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <div>data : {JSON.stringify(data)}</div>;
  }
}

export default TestPage;
