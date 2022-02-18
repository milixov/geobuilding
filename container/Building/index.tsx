import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useGetBuildingsByUser } from "ws/building";
import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IBuilding } from "lib/interfaces/IBuilding";

interface Props {
  selectedUser: string;
  building: IBuilding;
  onChangeBuilding?: (value: IBuilding) => void;
}

const BuildingContainer = (props: Props): JSX.Element => {
  const { selectedUser, building, onChangeBuilding } = props;

  const { data, refetch, isFetching } = useGetBuildingsByUser(selectedUser);

  useEffect(() => {
    refetch({ stale: true });
  }, [selectedUser]);

  useEffect(() => {
    if (!isFetching && data?.length > 0) {
      onChangeBuilding(data[0]);
    }
  }, [data]);

  const handleChangeBuilding = (id: IBuilding) => {
    onChangeBuilding(id);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <Box display="flex" flexDirection="column" height="100%">
        <CardHeader title="User's Building"></CardHeader>
        <Stack
          spacing={2}
          height="100%"
          display="flex"
          sx={{ p: 2, pt: 0 }}
          justifyContent="space-between"
        >
          <Box overflow="scroll" flexGrow={1}>
            <Typography variant="h3">
              {isFetching && (
                <Stack>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </Stack>
              )}
            </Typography>
            <Typography>
              {!selectedUser && !isFetching && "Select a user"}
            </Typography>
            <Typography>
              {selectedUser &&
                data?.length === 0 &&
                !isFetching &&
                "There is no building binded to this user, add a new one by clicking the button below"}
            </Typography>
            <List>
              {!isFetching &&
                data?.map((item) => (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleChangeBuilding(item)}
                      selected={item?.id === building?.id}
                    >
                      <ListItemText
                        primary={item?.name}
                        secondary={item?.country}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Box>
          <Box>
            <Button size="large" color="primary" fullWidth variant="contained">
              Add Building
            </Button>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};

export default BuildingContainer;
