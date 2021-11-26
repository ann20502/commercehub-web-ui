import { useAuth0 } from "@auth0/auth0-react";
import { Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import moment from 'moment';

const TaskFilter = (props) => {

  const [shop, setShop] = React.useState('');
  const [group, setGroup] = React.useState('');

  const [shops, setShops] = React.useState([]);
  const [groups, setGroups] = React.useState([]);

  const { getAccessTokenSilently } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {

    const getConfig = async () => {
      try {
        const token = await getAccessTokenSilently();

        Promise.all([
          fetch('/linker/taskGroup', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/linker/shop', { headers: { Authorization: `Bearer ${token}` } })
        ])
          .then(responses => Promise.all(
            responses.map(response => {
              if (response.ok) {
                return response.json();
              } else {
                const error = { message: 'Error while retrieving configurations: ' + response.statusText };
                throw error;
              }
            })
          ))
          .then(jsons => Promise.all(
            jsons.map(json => {
              if (json.error) {
                const error = { message: 'Error while retrieving configurations: ' + json.error };
                throw error;
              }
              return json.result;
            })
          ))
          .then(results => {
            // console.log('results', results);
            const groupResults = results[0];
            setGroups(groupResults);
            if ( groupResults.length <= 0 ) {
              enqueueSnackbar("No task group found", { variant: 'warning' });
            }

            const shopResults = results[1];
            setShops(shopResults);
            if ( shopResults.length <= 0 ) {
              enqueueSnackbar("No active shop found", { variant: 'warning' });
            }
          })
          .catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
          })
      } catch (error) {
        enqueueSnackbar("Error while retrieving configurations: " + error, { variant: 'error' });
      }
    };

    getConfig();

  }, [enqueueSnackbar, getAccessTokenSilently]);

  const onShopChange = (e) => {
    const value = e.target.value;
    setShop(value);
    props.shopChange(value);
  };

  const onGroupChange = (e) => {
    const value = e.target.value;
    setGroup(value);
    props.taskGroupChange(value);
  };

  const Content = () => {
    return <Box>
      <Card>
        <Box
          sx={{
            p: 2
          }}
        >
          <Typography
            color="textPrimary"
            variant="h2"
          >
            Task Overview
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
            Time Zone Offset {moment().format("Z")}
          </Typography>
        </Box>
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl fullWidth>
                <InputLabel id="shop-label">Shop</InputLabel>
                <Select
                  labelId="shop-label"
                  value={shop}
                  label="Shop"
                  onChange={(e) => onShopChange(e)}
                >
                  {
                    shops.map(shop => {
                      return <MenuItem key={shop.shopId} value={shop.shopId}>{shop.platform} - {shop.shopId} - {shop.shopName}</MenuItem>;
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl fullWidth>
                <InputLabel id="task-group-label">Task Group</InputLabel>
                <Select
                  labelId="task-group-label"
                  value={group}
                  label="Task Group"
                  onChange={(e) => onGroupChange(e)}
                >
                  {
                    groups.map(group => {
                      return <MenuItem key={group} value={group}>{group}</MenuItem>;
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>;
  };

  return <Content />
};

export default TaskFilter;