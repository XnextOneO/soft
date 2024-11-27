// "use client";
// import { Context, createContext, useMemo, useState } from "react";
// import { usePathname } from "next/navigation";
// import { BreadcrumbsProps, Loader } from "@mantine/core";
//
// import BreadcrumbsContainer from "./BreadcrumbsContainer";
// import BreadcrumbsItem from "./BreadcrumbsItem";
//
// export const BreadCrumbsContext = createContext<Context>({
//   trailingPath: "",
//   setTrailingPath: () => {},
// });
//
// const BreadCrumbs = ({ children }: BreadcrumbsProps) => {
//   const paths = usePathname();
//   const [trailingPath, setTrailingPath] = useState("");
//   const context = useMemo(
//     () => ({
//       trailingPath,
//       setTrailingPath,
//     }),
//     [trailingPath],
//   );
//
//   const pathNames = paths.split("/").filter(Boolean);
//   const pathItems = pathNames.map((path, index) => ({
//     name: path,
//     path: pathNames.slice(0, index + 1).join("/"),
//   }));
//
//   if (
//     trailingPath &&
//     pathItems.length > 0 &&
//     trailingPath !== pathItems.at(-1).name
//   ) {
//     pathItems.at(-1).name = trailingPath;
//   }
//
//   return (
//     <>
//       <BreadcrumbsContainer>
//         {pathItems.map((item) => (
//           <BreadcrumbsItem key={item.path} href={`/${item.path}`}>
//             {item.name === "loading" ? (
//               <Loader className="w-4 h-4" />
//             ) : (
//               item.name
//             )}
//           </BreadcrumbsItem>
//         ))}
//       </BreadcrumbsContainer>
//       <BreadCrumbsContext.Provider value={context}>
//         {children}
//       </BreadCrumbsContext.Provider>
//     </>
//   );
// };
//
// export default BreadCrumbs;
