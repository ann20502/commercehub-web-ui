import React, { useEffect, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from 'notistack';
import { Grid } from "@mui/material";
import ShopRating from "./shop-rating";
import ChatResponseTime from "./chat-response-time";
import PreparationTime from "./preparation-time";

const ShopPerformance = (props) => {

  const { getAccessTokenSilently } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  const DEFAULT_DATA = useMemo(() => { return [] }, []);
  const [data, setData] = React.useState(DEFAULT_DATA);

  useEffect(() => {
    const getPerformance = async () => {
      try {
        const uri = "/rs/shop/performance";
        const shopParamArr = getShopParamArr();

        const token = await getAccessTokenSilently();
        const fetches = shopParamArr.map(shopParams => {
          const finalUri = uri + "/" + shopParams.id;
          return fetch(finalUri, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                const error = { message: 'Error while retrieving shop performance: ' + response.statusText }
                throw error;
              }
            })
            .then(json => {
              if (json.error) {
                const error = { message: 'Error while retrieving shop performance: ' + json.error };
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
        enqueueSnackbar('Failed to get shop performance: ' + error, { variant: 'error' });
      }
    };

    const convertResultToDatasets = (results) => {
      return results.map((result, index) => {
        let shop = {};
        shop.name = getShopName(result.shopId);
        shop.rating = result.rating.performance;
        shop.preparationTime = result.fulfillmentPreparationTime.performance;
        shop.chatResponseTime = result.chatResponseTime.performance;
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

    const getShopParamArr = () => {
      return props.shops.filter(Boolean).map(shop => {
        return {
          id: shop.platform + '_' + shop.shopId
        }
      });
    }

    // Main function
    let active = true;
    getPerformance();

    return () => {
      // flush things off
      active = false;
      setData(DEFAULT_DATA);
    };
  }, [props.shops, DEFAULT_DATA, enqueueSnackbar, getAccessTokenSilently]);

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        lg={4}
        md={6}
        xs={12}
      >
        <ShopRating data={data} />
      </Grid>

      <Grid
        item
        lg={4}
        md={6}
        xs={12}
      >
        <ChatResponseTime data={data} />
      </Grid>

      <Grid
        item
        lg={4}
        md={6}
        xs={12}
      >
        <PreparationTime data={data} />
      </Grid>
    </Grid>
  );

}

export default ShopPerformance;