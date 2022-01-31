import { Avatar, Box, Card, CardContent, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { red } from '@mui/material/colors';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const PreparationTime = (props) => {

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

  const getPreparationTime = (preparationTime) => {
    return preparationTime.substring(0, preparationTime.indexOf("d"));
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
              {`< 2 DAYS`}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
              sx={{ fontSize: '18px' }}
            >
              PREPARATION TIME
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 50,
                width: 50
              }}
            >
              <LocalShippingIcon />
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
                    {getPreparationTime(shop.preparationTime)} days
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

export default PreparationTime;