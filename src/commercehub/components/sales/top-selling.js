import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, MenuItem, Select, styled, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo } from "react";
import moment from 'moment';
import { getTimeZoneByRegion } from '../common/time-zone-utils';

const TopSelling = (props) => {

  const CustomCardHeader = styled(CardHeader)(({ theme }) => ({
    '& .MuiCardHeader-action': {
      alignSelf: 'center'
    }
  }));

  const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-select': {
      color: theme.palette.primary.main,
      fontSize: '0.9rem',
      padding: '0',
      marginRight: '0.3rem',
      fontWeight: 500
    },
    '& .MuiSelect-icon': {
      color: theme.palette.primary.main,
    },
    '& .MuiSelect-iconOpen': {
      color: theme.palette.primary.main,
    }
  }));

  const DEFAULT_DATA = useMemo(() => { return [] }, []);
  const [data, setData] = React.useState(DEFAULT_DATA);

  const { getAccessTokenSilently } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getTopSelling = async () => {
      try {
        const uri = "/rs/products/top/";
        const dateRange = getDateRange();
        const uriParams = getUriParams(dateRange.from, dateRange.to);
        const shopParamArr = getShopParamArr();

        const token = await getAccessTokenSilently();
        const fetches = shopParamArr.map(shopParams => {
          const finalParams = [...uriParams, "zone=" + shopParams.zone];
          const finalUri = uri + "/" + shopParams.id + "?" + finalParams.join("&");
          return fetch(finalUri, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                const error = { message: 'Error while retrieving top selling: ' + response.statusText }
                throw error;
              }
            })
            .then(json => {
              if (json.error) {
                const error = { message: 'Error while retrieving top selling: ' + json.error };
                throw error;
              }
              json.result.shopId = shopParams.id;
              return json;
            });
        });

        Promise.all(fetches)
          .then(jsons => {
            if (active) {
              const results = jsons.map(json => { return json.result; });
              const datasets = convertResultToDatasets(results);
              setData(datasets);
            }
          })
          .catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
          });
      } catch (error) {
        enqueueSnackbar('failed to retrieve top selling products: ' + error, { variant: 'error' });
      }
    };

    const convertResultToDatasets = (results) => {
      return results.map((result, index) => {
        let shop = {};
        shop.name = getShopName(result.shopId);
        shop.products = result.items.map(item => {
          return {
            id: item.itemId,
            name: item.itemName,
            model: item.modelName,
            imageUrl: item.imageUrl,
            sold: item.sold
          }
        });
        return shop;
      });
    };

    const getShopName = (shopId) => {
      for (var i = 0; i < props.shops.length; i++) {
        var shop = props.shops[i];
        if (!shop) { continue; }

        const target = shop.platform + '_' + shop.shopId;
        if (shopId === target) {
          return shop.shopName;
        }
      }
      return "";
    }

    const getDateRange = (type) => {
      const dateFrom = moment().subtract(1, 'months').startOf('month');
      const dateTo = moment().subtract(1, 'months').endOf('month');
      // const dateFrom = moment().startOf('month');
      // const dateTo = moment().startOf('day');
      // const dateFrom = moment('1/10/2021', 'DD/MM/YYYY');
      // const dateTo = moment('31/12/2021', 'DD/MM/YYYY');
      return { from: dateFrom, to: dateTo };
    }

    const getUriParams = (from, to) => {
      const result = [];
      result.push("from=" + from.format("DD-MMM-YYYY"));
      result.push("to=" + to.format("DD-MMM-YYYY"));
      return result;
    };

    const getShopParamArr = () => {
      return props.shops.filter(Boolean).map(shop => {
        return {
          id: shop.platform + '_' + shop.shopId,
          zone: getTimeZoneByRegion(shop.shopRegion)
        }
      });
    }

    // Main function
    let active = true;
    getTopSelling();

    return () => {
      // flush things off
      active = false;
      setData(DEFAULT_DATA);
    };
  }, [props.shops, DEFAULT_DATA, enqueueSnackbar, getAccessTokenSilently]);

  return (
    <Card {...props}>
      <CustomCardHeader
        title="Top Selling Products"
        sx={{
          alignItems: "center"
        }}
        action={(
          <CustomSelect
            disableUnderline
            variant="standard"
            value="0"
          >
            <MenuItem value="0" sx={{ fontSize: '0.8rem' }}>Last Month</MenuItem>
          </CustomSelect>
        )}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 'auto',
            position: 'relative'
          }}
        >
          <List
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {
              data.map((shop) => (
                <li key={`section-${shop.name}`}>
                  <ul>
                    <ListSubheader disableGutters>{shop.name}</ListSubheader>
                    {
                      shop.products.map((product) => (
                        <ListItem
                          disableGutters
                          key={`item-${shop.name}-${product.name}`}
                          secondaryAction={
                            <Typography
                              sx={{ display: 'inline' }}
                              color="text.primary"
                              component="span"
                              variant="body2"
                            >
                              {product.sold} sold
                            </Typography>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar alt="avatar" src={product.imageUrl} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={product.name}
                            secondary={
                              <Typography
                                sx={{ display: 'inline' }}
                                color="text.primary"
                                component="span"
                                variant="body2"
                              >
                                {product.model}
                              </Typography>
                            }
                            sx={{ paddingRight: '0.8rem' }}
                            primaryTypographyProps={{
                              fontWeight: 'medium',
                              variant: 'body2',
                            }}
                          />
                        </ListItem>
                      ))
                    }
                  </ul>
                </li>
              ))
            }

          </List>
        </Box>
      </CardContent>
    </Card>
  );

};

export default TopSelling;