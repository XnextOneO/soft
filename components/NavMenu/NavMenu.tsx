"use client";
import { useMantineColorScheme } from "@mantine/core";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";

import { Context } from "@/app/providers";

import NavMenuStack from "./NavMenuStack";

const NavMenu = observer(() => {
	const { burgerStore } = useContext(Context);
	const colorScheme = useMantineColorScheme();

	const [active, setActive] = useState(false);

	return (
		<>
			{burgerStore.opened ? (
				<NavMenuStack
					colorScheme={colorScheme.colorScheme}
					active={active}
					setActive={setActive}
					width={250}
					opened={true}
					marginLeft={10}
				/>
			) : (
				<NavMenuStack
					colorScheme={colorScheme.colorScheme}
					active={active}
					setActive={setActive}
					width={60}
					opened={false}
					marginLeft={0}
				/>
			)}
		</>
	);
});

export default NavMenu;
