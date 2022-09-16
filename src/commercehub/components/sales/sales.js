import React, { useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
  Select,
  MenuItem
} from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from '@mui/styles';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { getTimeZoneByRegion } from '../common/time-zone-utils';

const Sales = (props) => {

  const TYPE_LAST_5_MONTHS = 0;
  const TYPE_LAST_7_DAYS = 1;

  const theme = useTheme();

  const DEFAULT_DATA = useMemo(() => { return { datasets: [], labels: [] } }, []);
  const [data, setData] = React.useState(DEFAULT_DATA);
  const [type, setType] = React.useState(TYPE_LAST_5_MONTHS);

  const { getAccessTokenSilently } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getUri = (type) => {
      switch (type) {
        case TYPE_LAST_5_MONTHS:
          return "/rs/sales/month";

        case TYPE_LAST_7_DAYS:
          return "/rs/sales/date";

        default:
          return "";
      }
    };

    const getDateRange = (type) => {
      switch (type) {
        case TYPE_LAST_5_MONTHS:
          const dateFrom = moment().subtract(4, 'months').startOf('month');
          const dateTo = moment().startOf('day');
          return { from: dateFrom, to: dateTo };

        case TYPE_LAST_7_DAYS:
          const from = moment().subtract(6, 'days');
          const to = moment().startOf('day');
          return { from: from, to: to };

        default:
          return {};
      }
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
          platform: shop.platform,
          shopId: shop.shopId,
          zone: getTimeZoneByRegion(shop.shopRegion)
        }
      });
    }

    const getDatasetLabels = (type, from, to) => {
      let currentFrom = from.clone().startOf('day');
      let currentTo = to.clone().startOf('day');
      const result = [];

      switch (type) {
        case TYPE_LAST_5_MONTHS:
          while (!currentFrom.isAfter(currentTo)) {
            result.push(currentFrom.format('YYYY MMM'));
            currentFrom = currentFrom.add(1, 'months');
          }
          break;

        case TYPE_LAST_7_DAYS:
          while (!currentFrom.isAfter(currentTo)) {
            result.push(currentFrom.format("DD MMM"));
            currentFrom = currentFrom.add(1, 'days');
          }
          break;

        default:
          break;
      }

      return result;
    }

    const convertResultToDatasets = (results, type, from, to) => {
      return results.map((result, index) => {
        const obj = {};
        const sales = result.result;
        const shopName = getShopName(result.platform, result.shopId);

        for (var i = 0; i < sales.length; i++) {
          const sale = sales[i];
          obj[sale.date] = sale.total;
        }

        const incrementUnit = type === TYPE_LAST_5_MONTHS ? 'months' : 'days';
        let currentFrom = from.clone().startOf('day');
        const currentTo = to.clone().startOf('day');

        const data = [];
        while (!currentFrom.isAfter(currentTo)) {
          const strFrom = currentFrom.format("YYYY-MM-DD");
          const amount = obj[strFrom] ? obj[strFrom] : 0;
          data.push(amount);
          currentFrom = currentFrom.add(1, incrementUnit);
        }

        return getDataset(index, shopName, data);
      });
    };

    const getShopName = (platform, shopId) => {
      for (var i = 0; i < props.shops.length; i++) {
        var shop = props.shops[i];
        if (!shop) { continue; }

        if (shop.platform === platform && shop.shopId === shopId) {
          return shop.shopName;
        }
      }
      return "";
    }

    const getDataset = (index, label, data) => {
      return {
        backgroundColor: DATASET_COLORS[index],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: data,
        label: label,
        maxBarThickness: 10
      };
    }

    // const myColors = [
    //   colors.indigo[500],
    //   colors.red[600],
    //   colors.orange[600]
    // ];

    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    };

    const DATASET_COLORS = [
      colors.indigo[500],
      CHART_COLORS.red,
      CHART_COLORS.blue
    ];

    const getSales = async () => {
      if (props.shops.length <= 0 || props.shops.filter(Boolean).length <= 0) {
        return;
      }

      try {
        const uri = getUri(type);
        const dateRange = getDateRange(type);
        const uriParams = getUriParams(dateRange.from, dateRange.to);
        const labels = getDatasetLabels(type, dateRange.from, dateRange.to);
        const shopParamArr = getShopParamArr();

        const token = await getAccessTokenSilently();
        const fetches = shopParamArr.map(shopParams => {
          const finalParams = [...uriParams, "zone=" + shopParams.zone];
          const finalUri = uri + "/" + shopParams.platform + "/" + shopParams.shopId + "?" + finalParams.join("&");
          return fetch(finalUri, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
              if ( response.ok ) {
                return response.json();
              } else {
                const error = { message: 'Error while retrieving sales: ' + response.statusText }
                throw error;
              }
            })
            .then(json => {
              if (json.error) {
                const error = { message: 'Error while retrieving sales: ' + json.error };
                throw error;
              }
              json.platform = shopParams.platform;
              json.shopId = shopParams.shopId;
              return json;
            });
        });

        Promise.all(fetches)
          .then(jsons => {
            if (active) {
              const results = jsons.map(json => {
                if ( json.error ) {
                  const error = { message: 'Error while retrieving sales: ' + json.error };
                  throw error;
                }
                return json;
              });

              const datasets = convertResultToDatasets(results, type, dateRange.from, dateRange.to);
              const finalData = {
                datasets: datasets,
                labels: labels
              };

              setData(finalData);
            }
          })
          .catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
          });
      } catch (error) {
        enqueueSnackbar('Failed to get sales: ' + error, { variant: 'error' });
      }
    };

    // Main function
    let active = true;
    getSales();

    return () => {
      // flush things off
      active = false;
      setData(DEFAULT_DATA);
    };
  }, [props.shops, type, DEFAULT_DATA, enqueueSnackbar, getAccessTokenSilently]);

  const options = {
    animation: true,
    indexAxis: 'y',
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: true,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    }
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

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

  const CustomCardHeader = styled(CardHeader)(({ theme }) => ({
    '& .MuiCardHeader-action': {
      alignSelf: 'center'
    }
  }));

  return (
    <Card {...props}>
      <CustomCardHeader
        action={(
          <CustomSelect
            disableUnderline
            variant="standard"
            value={type}
            onChange={handleChange}
          >
            <MenuItem value={TYPE_LAST_5_MONTHS} sx={{ fontSize: '0.8rem' }}>LAST 5 MONTHS</MenuItem>
            <MenuItem value={TYPE_LAST_7_DAYS} sx={{ fontSize: '0.8rem' }}>LAST 7 DAYS</MenuItem>
          </CustomSelect>
        )}
        title="Latest Sales"
        sx={{
          alignItems: "center"
        }}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Sales;