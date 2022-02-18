import Head from "next/head";
import type { NextPage } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import UsersContainer from "container/Users";
import BuildingContainer from "container/Building";

import { IBuilding } from "lib/interfaces/IBuilding";

const MapContainer = dynamic(() => import("container/MapViewer"), {
  ssr: false
});

const Home: NextPage = () => {
  const [user, setUser] = useState<string>(null);
  const handleChangeUser = (user: string) => {
    setUser(user);
  };

  const [building, setBuilding] = useState<IBuilding>(null);
  const handleChangeBuilding = (building: IBuilding) => {
    setBuilding(building);
  };

  return (
    <Container>
      <Head>
        <title>Geo Building | Main Page</title>
      </Head>

      <Box height="100vh" sx={{ pt: 4 }}>
        <Grid container spacing={4} height="100%">
          <Grid item xs={4} height="100%">
            <Stack spacing={4} height="100%">
              <Box flex="auto">
                <UsersContainer user={user} onChangeUser={handleChangeUser} />
              </Box>
              <Box flexGrow={1} height="100%">
                <BuildingContainer
                  selectedUser={user}
                  building={building}
                  onChangeBuilding={handleChangeBuilding}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <MapContainer selectedCountry={building?.country}/>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
