import { useTheme, useMediaQuery, Grid, Container } from "@mui/material";
import { Box } from "@mui/system";
import { SnackbarProvider } from "notistack";
import React from "react";
import ShopSelections from "../components/sales/shop-selection";
import Sales from "../components/sales/sales";
import TopSelling from "../components/sales/top-selling";
import LatestProduct from "../components/sales/latest-product";
import ShopPerformance from "../components/sales/shop-performance";

const SalesOverview = () => {

  const theme = useTheme();

  const [shops, setShops] = React.useState([]);

  const setSelected = (selected) => {
    setShops(selected);
  }

  const stackSize = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true }) ? 3 : 1;

  const wrapper =
    <SnackbarProvider maxSnack={stackSize} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <ShopSelections
                setSelected={setSelected}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <ShopPerformance
                shops={shops}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <Sales shops={shops} />
            </Grid>

            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <TopSelling shops={shops} />
            </Grid>

            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <LatestProduct shops={shops} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </SnackbarProvider>;

  return wrapper;
};

export default SalesOverview;