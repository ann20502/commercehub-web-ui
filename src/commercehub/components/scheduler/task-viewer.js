import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid'
import { styled } from "@mui/styles";

const SimpleTaskViewer = ({ shopId, taskGroup, type }) => {

  const [ rows, setRows ] = React.useState([]);
  const [ loading, setLoading ] = React.useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getLastCreated = async () => {
      try {
        if ( !shopId || !taskGroup ) {
          return;
        }

        // console.log("task viewer loading ... " + shopId + " | " + taskGroup + " | " + type);
        setLoading(true);
        const targetUri = '/linker/task/' + taskGroup + '/' + shopId + '/' + type;
        const token = await getAccessTokenSilently();
        const response = await fetch(
          targetUri,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if ( active ) {
          const json = await response.json();
          // console.log('json', json);
          if (json.error) {
            enqueueSnackbar("Error while retrieving last created tasks: " + json.error, { variant: 'error' });
            return;
          }
  
          const finalRows = convertResultToRow(json.result);
          setLoading(false);
          setRows(finalRows);
        }
      } catch (error) {
        enqueueSnackbar("Error while retrieving last created tasks: " + error, { variant: 'error' });
      }
    };

    let active = true;
    getLastCreated();

    return function() {
      active = false;
    }
  }, [shopId, taskGroup, type, getAccessTokenSilently, enqueueSnackbar]);

  const convertResultToRow = (result) => {
    return result.map(content => {
      return {
        id: content.id,
        from: moment(content.paramTimeFrom).format("D-MMM-YYYY HH:mm"),
        to: moment(content.paramTimeTo).format("D-MMM-YYYY HH:mm"),
        start: content.startTime ? moment(content.startTime).format("D-MMM-YYYY HH:mm") : "-",
        end: content.endTime ? moment(content.endTime).format("D-MMM-YYYY HH:mm") : "-",
      }
    })
  };

  const getHeader = () => {
    switch (type) {
      case "longRunning":
        return "Long Running (Yet Complete)";

      case "lastCreated":
        return "Last Created";

      case "lastStarted":
        return "Last Started";

      case "lastCompleted":
        return "Last Completed";

      case "lastFailed":
        return "Last Failed";

      case "nextPending":
        return "Next Execution";

      default:
        return "";
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 100, flex: 0.5 },
    { field: 'from', headerName: 'Time From', minWidth: 150, flex: 1 },
    { field: 'to', headerName: 'Time To', minWidth: 150, flex: 1 },
    { field: 'start', headerName: 'Start Time', minWidth: 150, flex: 1 },
    { field: 'end', headerName: 'End Time', minWidth: 150, flex: 1 }
  ];

  const MyDataGrid = styled(DataGrid)({
    backgroundColor: '#fff',
    marginTop: '1rem'
  });

  function ContentDataGrid() {
    return <Box>
      <Typography
        variant="h4">
        {getHeader()}
      </Typography>
      <MyDataGrid
        autoHeight
        hideFooter
        loading={loading}
        rows={rows}
        columns={columns}
      />
    </Box>;
  }

  return <ContentDataGrid />;
};

export default SimpleTaskViewer;