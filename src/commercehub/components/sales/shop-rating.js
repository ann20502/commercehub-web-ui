import { Avatar, Box, Card, CardContent, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { orange } from '@mui/material/colors';
import GradeIcon from '@mui/icons-material/Grade';

const ShopRating = (props) => {

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

  const getRating = (rating) => {
    return rating.substring(0, rating.indexOf("/"));
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
              5 STARS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
              sx={{ fontSize: '18px' }}
            >
              SHOP RATING
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: orange[600],
                height: 50,
                width: 50
              }}
            >
              <GradeIcon />
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
                key={`shop-rating-${shop.name}`}
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
                    {getRating(shop.rating)} stars
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

export default ShopRating;