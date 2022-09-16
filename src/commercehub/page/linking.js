import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Card, CardActions, CardContent, CardMedia, Divider, Fab, Grid, Snackbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { green, orange } from "@mui/material/colors";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoggingIn from '../auth/logging-in'
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add';

const MyCardMedia = styled(CardMedia)({
  objectFit: 'contain',
  height: '150px'
});

const Title = styled('span')({
  textTransform: 'capitalize'
});

const TypographyEllipsis = styled(Typography)({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

const MyFab = styled(Fab)({
  margin: '0',
  top: 'auto',
  left: 'auto',
  bottom: '1.5rem',
  right: '1.5rem',
  position: 'fixed'
});

const Wrapper = styled('div')({
  padding: '0.5rem',
  textAlign: 'center'
});

const ItemWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center'
});

const ItemLeft = styled(Box)({
  width: '180px',
  textAlign: 'right',
  marginRight: '1rem'
});

const ItemRight = styled(Box)({
  width: '180px',
  textAlign: 'left'
});

const Linking = () => {

  const PAGE_LOADING = 0;
  const PAGE_ERROR = 1;
  const PAGE_NO_LINKING = 2;
  const PAGE_LINKING = 3;

  const [page, setPage] = useState(PAGE_LOADING);
  const [linkings, setLinkings] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getLinking = async () => {
      try {
        const token = await getAccessTokenSilently();
        // console.log(token);
        const response = await fetch(
          '/linker/linking',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) { throw response.statusText; }

        const json = await response.json();
        if (json.error) {
          const error = { message: json.error };
          throw error;
        }

        const result = json.result;
        setLinkings(result);
        setPage(result.length <= 0 ? PAGE_NO_LINKING : PAGE_LINKING);
      } catch (error) {
        setPage(PAGE_ERROR);
      }
    };

    getLinking();
  }, [getAccessTokenSilently]);

  const theme = useTheme();

  const Fab = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true }) ?
    <MyFab color="secondary" variant="extended" component={Link} to="/linking/add">
      Add Shop
    </MyFab>
    :
    <MyFab color="secondary" component={Link} to="/linking/add">
      <AddIcon />
    </MyFab>;

  const PageContent = () => {
    const items = linkings.map(mLinking => {
      const linking = mLinking.linking;
      if (!linking.status) { return ""; }

      const shopName = linking.shopName ? linking.shopName : '-';
      const shopStatus = linking.status ? 'Active' : '-';

      const targetUri = '/linking/edit?documentId=' + linking.id;
      const button = <Button size="small" component={Link} to={targetUri} color="primary">View Details</Button>;
      const setup = linking.hasSetup ?
        <Typography variant="span" sx={{ color: green[500] }}>Completed</Typography>
        : <Typography variant="span" sx={{ color: orange[500] }}>Pending</Typography>;

      const startDate = linking.businessStartDate ? moment(linking.businessStartDate).format('DD-MMM-YYYY') : '-';

      return <Grid item xs={12} md={6} lg={3} key={linking.id}>
        <Card>
          <MyCardMedia
            component="img"
            alt="Platform Image"
            image={mLinking.pathLogo}
          />
          <CardContent sx={{ padding: '0.8rem', paddingTop: 0, paddingBottom: '1rem' }}>
            <Wrapper sx={{ paddingTop: 0, paddingBottom: 0 }}>
              <TypographyEllipsis variant="h4" component="div"><Title>{shopName}</Title></TypographyEllipsis>
              <Typography gutterBottom variant="body2" component="div" color="text.secondary"><Title>{linking.platform}</Title></Typography>
            </Wrapper>
            <Wrapper sx={{ textAlign: 'center', paddingBottom: 0 }}>
              <ItemWrapper>
                <ItemLeft>
                  <Typography variant="body2" color="text.secondary">
                    Shop ID
                  </Typography>
                </ItemLeft>
                <ItemRight>
                  <Typography variant="body2">
                    {linking.shopId}
                  </Typography>
                </ItemRight>
              </ItemWrapper>
              <ItemWrapper>
                <ItemLeft>
                  <Typography variant="body2" color="text.secondary">
                    Shop Status
                  </Typography>
                </ItemLeft>
                <ItemRight>
                  <Typography variant="body2">
                    {shopStatus}
                  </Typography>
                </ItemRight>
              </ItemWrapper>
              <ItemWrapper>
                <ItemLeft>
                  <Typography variant="body2" color="text.secondary">
                    Partner ID
                  </Typography>
                </ItemLeft>
                <ItemRight>
                  <Typography variant="body2">
                    {linking.partnerId}
                  </Typography>
                </ItemRight>
              </ItemWrapper>
              <ItemWrapper>
                <ItemLeft>
                  <Typography variant="body2" color="text.secondary">
                    Business Start Date
                  </Typography>
                </ItemLeft>
                <ItemRight>
                  <Typography variant="body2">
                    {startDate}
                  </Typography>
                </ItemRight>
              </ItemWrapper>
              <ItemWrapper>
                <ItemLeft>
                  <Typography variant="body2" color="text.secondary">
                    Database Setup
                  </Typography>
                </ItemLeft>
                <ItemRight>
                  <Typography variant="body2">
                    {setup}
                  </Typography>
                </ItemRight>
              </ItemWrapper>
            </Wrapper>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'center' }}>
            {button}
          </CardActions>
        </Card>
      </Grid>;
    });

    return <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', p: 3 }}>
      <Grid container spacing={4}>{items}</Grid>
      {Fab}
    </Box>;
  };

  function NoLinking() {
    return <React.Fragment>
      <Box sx={{ p: 3 }}>
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          No Linking Found
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
        >
          Please link the shop you wish to access the data
        </Typography>
      </Box>
      {Fab}
    </React.Fragment>;
  }

  function PageError() {
    return <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert severity="error" sx={{ width: '100%' }}>
        Error while loading content
      </Alert>
    </Snackbar>;
  }

  const getContent = () => {
    switch (page) {
      case PAGE_LOADING:
        return <LoggingIn backgroundColor='background.default' />;

      case PAGE_ERROR:
        return <PageError />;

      case PAGE_LINKING:
        return <PageContent />;

      case PAGE_NO_LINKING:
        return <NoLinking />;

      default:
        return <LoggingIn backgroundColor='background.default' />;
    }
  }

  return getContent();
};

export default Linking;