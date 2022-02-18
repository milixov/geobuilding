import { useGetUser } from "ws/user";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

interface Props {
  user?: string;
  onChangeUser?: (value: string) => void;
}

const UserContainer = (props: Props): JSX.Element => {
  const { user, onChangeUser } = props;
  const { isLoading, data } = useGetUser();

  const handleChangeUser = (event: SelectChangeEvent) => {
    onChangeUser(event.target.value as string);
  };

  return (
    <Card>
      <CardHeader title="User List"></CardHeader>
      <CardContent>
        <Typography variant="h3">
          {isLoading && <Skeleton variant="text" />}
        </Typography>
        {data && (
          <FormControl fullWidth>
            <InputLabel id="select-label">Select User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user}
              label="Select User"
              onChange={handleChangeUser}
            >
              {data?.map((item) => (
                <MenuItem value={item.username}>{item.fullName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </CardContent>
    </Card>
  );
};

export default UserContainer;
