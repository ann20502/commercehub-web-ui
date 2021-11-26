import { useTheme, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { SnackbarProvider } from "notistack";
import React from "react";
import TaskFilter from "../components/scheduler/task-filter";
import SimpleTaskViewer from "../components/scheduler/task-viewer";
import { styled } from "@mui/styles";

const TaskOverview = () => {

  const theme = useTheme();
  const stackSize = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true }) ? 3 : 1;

  const [shopId, setShopId] = React.useState('');
  const [taskGroup, setTaskGroup] = React.useState('');

  const Wrapper = styled(Box)({
    marginTop: '1.5rem'
  });

  const shopChange = (shop) => {
    setShopId(shop);
  }

  const taskGroupChange = (group) => {
    setTaskGroup(group);
  }

  const content = <SnackbarProvider maxSnack={stackSize} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        p: 3
      }}
    >
      <TaskFilter shopChange={shopChange} taskGroupChange={taskGroupChange} />
      <Wrapper>
        <SimpleTaskViewer type="nextPending" shopId={shopId} taskGroup={taskGroup} />
      </Wrapper>
      <Wrapper>
        <SimpleTaskViewer type="lastCreated" shopId={shopId} taskGroup={taskGroup} />
      </Wrapper>
      <Wrapper>
        <SimpleTaskViewer type="lastStarted" shopId={shopId} taskGroup={taskGroup} />
      </Wrapper>
      <Wrapper>
        <SimpleTaskViewer type="lastCompleted" shopId={shopId} taskGroup={taskGroup} />
      </Wrapper>
      <Wrapper>
        <SimpleTaskViewer type="lastFailed" shopId={shopId} taskGroup={taskGroup} />
      </Wrapper>
      <Wrapper>
        <SimpleTaskViewer type="longRunning" shopId={shopId} taskGroup={taskGroup} />
      </Wrapper>
    </Box>
  </SnackbarProvider>;

  return content;
};

export default TaskOverview;