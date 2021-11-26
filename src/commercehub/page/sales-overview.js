import { useTheme, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { SnackbarProvider } from "notistack";
import React from "react";
import ShopSelections from "../components/sales/shop-selection";
import Sales from "../components/sales/sales";

const SalesOverview = () => {

  const theme = useTheme();

  const [shops, setShops] = React.useState([]);

  const setSelected = (selected) => {
    setShops(selected);
  }

  const stackSize = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true }) ? 3 : 1;

  const wrapper =
    <SnackbarProvider maxSnack={stackSize} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          p: 3
        }}
      >
        <ShopSelections
          setSelected={setSelected}
        />
        <Box
          sx={{
            pt: 3
          }}
        >
          <Sales shops={shops} />
        </Box>
      </Box>
    </SnackbarProvider>;

  return wrapper;
};

export default SalesOverview;