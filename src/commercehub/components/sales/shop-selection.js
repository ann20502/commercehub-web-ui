import { useAuth0 } from "@auth0/auth0-react";
import { Card, CardContent, CardHeader, Checkbox, Divider, FormControlLabel, FormGroup, Grid } from "@mui/material";
import { styled } from "@mui/styles";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";


const ShopSelections = (props) => {

  const [shops, setShops] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const { getAccessTokenSilently } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getAllShop = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          '/linker/shop',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if ( !response.ok ) { throw response.statusText; }

        const json = await response.json();
        if ( json.error.length > 0 ) {
          enqueueSnackbar('failed to retrieve shops: ' + json.error, { variant: 'error' });
        } else {
          if ( json.result.length <= 0 ) { enqueueSnackbar('Please link a shop first', { variant: 'warning' }); }

          const initialSelected = new Array(json.length).fill('');
          setShops(json.result);
          setSelected(initialSelected);
        }
      } catch (error) {
        enqueueSnackbar('failed to retrieve shops: ' + error, { variant: 'error' });
      }
    };

    getAllShop();
  }, [getAccessTokenSilently, enqueueSnackbar]);

  const handleChange = (shop, index, event) => {
    const finalSelected = [...selected];
    finalSelected[index] = event.target.checked ? shop : '';
    setSelected(finalSelected);
    props.setSelected(finalSelected); // pass to parent
  };

  const CustomFormControlLabel = styled(FormControlLabel)({
    maxWidth: '100%',
    '& .MuiFormControlLabel-label': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  });

  const Selections = () => {
    const selections = shops.map((shop, index) => {
      return <CustomFormControlLabel
        label={shop.shopName}
        key={shop.platform + '_' + shop.shopId}
        value={shop.platform + '_' + shop.shopId}
        control={<Checkbox checked={selected[index] ? true : false} onChange={(e) => handleChange(shop, index, e)} />}
      />
    });

    return <FormGroup row>{selections}</FormGroup>;
  };

  const Content = () => {
    return <Card variant="outlined">
      <CardHeader
        title="Shop Selection"
      />
      <Divider />
      <CardContent>
        <Grid
          container
        >
          <Grid item sx={{ width: '100%' }}>
            <Selections />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  };

  return <Content />;
};

export default ShopSelections;