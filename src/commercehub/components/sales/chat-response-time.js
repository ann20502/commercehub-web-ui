import { Avatar, Box, Card, CardContent, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { green } from '@mui/material/colors';
import ChatIcon from '@mui/icons-material/Chat';

const ChatResponseTime = (props) => {

  const data = props.data;

  const ItemWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between'
  });

  const ItemLeft = styled(Box)({
    textAlign: 'left'
  });

  const ItemRight = styled(Box)({
    textAlign: 'right'
  });

  const getChatResponseTime = (chatResponseTime) => {
    return chatResponseTime.substring(0, chatResponseTime.indexOf("d"));
  }

  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              {`< 1 DAYS`}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
              sx={{ fontSize: '18px' }}
            >
              CHAT RESPONSE TIME
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 50,
                width: 50
              }}
            >
              <ChatIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2
          }}
        >
          {
            data.map((shop) => (
              <ItemWrapper
                key={`chat-response-${shop.name}`}
              >
                <ItemLeft>
                  <Typography
                    variant="body2"
                  >
                    {shop.name}
                  </Typography>
                </ItemLeft>
                <ItemRight>
                  <Typography
                    variant="body2"
                  >
                    {getChatResponseTime(shop.chatResponseTime)} days
                  </Typography>
                </ItemRight>
              </ItemWrapper>
            ))
          }
        </Box>
      </CardContent>
    </Card>
  );

};

export default ChatResponseTime;