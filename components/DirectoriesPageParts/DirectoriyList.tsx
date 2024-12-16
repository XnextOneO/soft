import { Grid } from "@mantine/core";

import DirectoryItem from "./DirectoryItem";

interface Directory {
    link: string;
    name: string;
}

interface DirectoryListProperties {
    directories: Directory[];
    colorScheme: "light" | "dark" | "auto";
}

const DirectoryList: React.FC<DirectoryListProperties> = ({ directories, colorScheme }) => {
    return (
        <Grid mb={20}>
            {directories.map((directory, index) => (
                <Grid.Col key={index} span={2}>
                    <DirectoryItem directory={directory} colorScheme={colorScheme} />
                </Grid.Col>
            ))}
        </Grid>
    );
};

export default DirectoryList;
