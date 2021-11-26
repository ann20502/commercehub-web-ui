import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Card, CardContent, Container, Divider, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import LoggingIn from "../auth/logging-in";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import * as Yup from 'yup';

const LinkingEdit = () => {

  const STATUS_LOADING = 0;
  const STATUS_ERROR = 1;
  const STATUS_CONTENT = 2;

  const [status, setStatus] = useState(STATUS_LOADING);
  const [error, setError] = useState("");
  const [linking, setLinking] = useState({});
  const { getAccessTokenSilently } = useAuth0();
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  const documentId = query.get("documentId");
  const history = useHistory();

  useEffect(() => {
    const getLinking = async () => {
      try {
        if (!documentId) { setStatus(STATUS_ERROR); setError("Invalid document"); return; }
  
        const token = await getAccessTokenSilently();
        const response = await fetch(
          '/linker/linking/' + documentId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if ( !response.ok ) { throw response.statusText; }

        const json = await response.json();
        if (json.error.length > 0) {
          setStatus(STATUS_ERROR);
          setError(json.error);
        } else {
          setStatus(STATUS_CONTENT);
          setLinking(json.result);
        }
      } catch (error) {
        setStatus(STATUS_ERROR);
        setError("Failed to get document: " + error);
      }
    };

    getLinking();
  }, [getAccessTokenSilently, documentId]);

  const onClickUnlink = async () => {
    const redirectUri = window.location.origin + '/linking';

    try {
      const targetUri = '/linker/unlink/login/' + linking.platform + '/' + documentId + "?redirectUri=" + redirectUri;
      const token = await getAccessTokenSilently();
      const response = await fetch(
        targetUri,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if ( !response.ok ) { throw response.statusText; }
      const result = await response.json();
      window.location = result.uri;
    } catch (error) {
      setStatus(STATUS_ERROR);
      setError("Failed to get auth cancellation url: " + error);
    }
  };

  const MyForm = () => {
    const startDate = linking.businessStartDate ? moment(linking.businessStartDate).format("DD-MMM-yyyy") : "";

    Yup.addMethod(Yup.date, 'format', function (formats, parseStrict) {
      return this.transform(function (value, originalValue) {
        value = moment(originalValue, formats, parseStrict);
        return value.isValid() ? value.toDate() : null;
      });
    });

    return <Formik
      initialValues={{
        platform: linking.platform,
        partnerId: linking.partnerId,
        shopId: linking.shopId,
        shopName: linking.shopName,
        shopRegion: linking.shopRegion,
        shopStatus: linking.shopStatus,
        businessStartDate: startDate
      }}
      validationSchema={
        Yup.object({
          businessStartDate: Yup.date().format("DD-MMM-yyyy").nullable().required('Business Start Date is required and must be in DD-MMM-YYYY')
        })
      }
      onSubmit={async (values, {setStatus}) => {
        try {
          const targetUri = '/linker/linking/setup';
          const token = await getAccessTokenSilently();
          const response = await fetch(
            targetUri,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                documentId: documentId,
                businessStartDate: values.businessStartDate
              })
            }
          )

          if ( !response.ok ) { throw response.statusText; }

          const json = await response.json();
          if ( json.error.length > 0 || !json.result ) {
            setStatus("Failed to setup linking");
          } else {
            history.push('/linking');
          }
        } catch (error) {
          setStatus("Failed to setup linking: " + error);
        }
      }}
    >
      {({
        values,
        isSubmitting,
        handleChange,
        touched,
        errors,
        setFieldValue,
        status
      }) => (
        <Form>
          <Container maxWidth="lg" disableGutters>
            <Card>
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Linking Details
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    You are editing linking details
                  </Typography>
                </Box>
                <Box>
                  <Button variant="outlined" color="error" onClick={() => onClickUnlink()}>Unlink</Button>  
                </Box>
              </Box>
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Platform"
                      type="text"
                      value={values.platform}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Partner ID"
                      type="text"
                      value={values.partnerId}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Shop ID"
                      type="text"
                      value={values.shopId}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Shop Name"
                      type="text"
                      value={values.shopName}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Shop Region"
                      type="text"
                      value={values.shopRegion}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Shop Status"
                      type="text"
                      value={values.shopStatus}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        fullWidth
                        label="Business Start Date"
                        value={values.businessStartDate}
                        inputFormat="dd-MMM-yyyy"
                        disableMaskedInput
                        name="businessStartDate"
                        onChange={value => setFieldValue("businessStartDate", moment(value).format("DD-MMM-yyyy", false))}
                        renderInput={(params) =>
                          <TextField
                            fullWidth
                            error={Boolean(touched.businessStartDate && errors.businessStartDate)}
                            helperText={touched.businessStartDate && errors.businessStartDate}
                            {...params}
                          />
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2
                }}
              >
                <Typography variant="h5" color="error">{status}</Typography>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Card>
          </Container>
        </Form>
      )}
    </Formik>;
  };

  const Error = () => {
    return <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>;
  };

  const Content = () => {
    switch (status) {
      case STATUS_LOADING:
        return <LoggingIn backgroundColor="background.default" />;

      case STATUS_ERROR:
        return <Error />;

      case STATUS_CONTENT:
        return <MyForm />

      default:
        return <Error />;
    }
  };

  const wrapper =
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          p: 3
        }}
      >
        <Content />
      </Box>
    </>;

  return wrapper;
};

export default LinkingEdit;