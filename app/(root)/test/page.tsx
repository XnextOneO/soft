import { cookies } from "next/headers";
import { useQuery } from "@tanstack/react-query";

import { fetchApiData } from "@/app/api/hooks";

export default function TestPage(): JSX.Element {
  // const parameters = {
  //   page: 0,
  //   size: 20,
  //   sort: "ASC",
  //   column: "FIRST_ORDER_BALANCE_ACCOUNT_NUMBER",
  // };

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["apiData", parameters],
  //   queryFn: async () => {
  //     return fetchApiData(parameters);
  //   },
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // } else if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else {
  //   return <div>data : {JSON.stringify(data)}</div>;
  // }
  const cookieStore = cookies();
  return (
    <>
      {cookieStore
        .getAll()
        .map((cookie) => console.log(cookie.name, cookie.value))}
    </>
  );
}
