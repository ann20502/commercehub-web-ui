import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Card, CardContent, Container, Divider, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import LoggingIn from '../auth/logging-in'

const LinkingAdd = () => {

  const PAGE_LOADING = 0;
  const PAGE_ERROR = 1;
  const PAGE_NO_PLATFORM = 2;
  const PAGE_CONTENT = 3;
  const [page, setPage] = useState(PAGE_LOADING);

  const defaultPlatforms = [];
  const [platforms, setPlatforms] = useState(defaultPlatforms);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getPlatform = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          '/linker/platform',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if ( !response.ok ) { throw response.statusText; }

        const json = await response.json();
        if ( json.error.length > 0 ) {
          setPage(PAGE_ERROR);
          return;
        }

        const result = json.result;
        setPlatforms(result);
        setPage(result.length <= 0 ? PAGE_NO_PLATFORM : PAGE_CONTENT);
      } catch (error) {
        setPage(PAGE_ERROR);
      }
    };

    getPlatform();
  }, [getAccessTokenSilently]);

  const content =
    <Formik
      initialValues={{
        platform: platforms && platforms.length > 0 ? platforms[0].name : "",
        partnerId: "",
        partnerSecret: ""
      }}
      validationSchema={
        Yup.object({
          platform: Yup.string().max(255).required('Platform is required'),
          partnerId: Yup.string().max(255).required('Partner ID is required'),
          partnerSecret: Yup.string().max(255).required('Partner Secret is required')
        })
      }
      onSubmit={async (values, {setStatus}) => {
        const redirectUri = window.location.origin + '/linking';

        try {
          const targetUri = '/linker/link/login/' + values.platform;
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
                partnerId: values.partnerId,
                partnerSecret: values.partnerSecret,
                redirectUri: redirectUri
              })
            }
          )

          if ( !response.ok ) { throw response.statusText; }
          const result = await response.json();
          window.location = result.uri;
        } catch (error) {
          setStatus("Failed to get auth url: " + error);
        }
      }}
    >
      {({
        values,
        isSubmitting,
        handleChange,
        touched,
        errors,
        status
      }) => (
        <Form>
          <Container maxWidth="lg">
            <Card>
              <Box
                sx={{
                  p: 2
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="h2"
                >
                  Add Shop
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Add shop to browse the data
                </Typography>
              </Box>
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      label="Select Platform"
                      fullWidth
                      name="platform"
                      select
                      SelectProps={{ native: true }}
                      inputProps={{ style: { textTransform: 'capitalize' } }}
                      variant="outlined"
                      onChange={handleChange}
                      value={values.platform}
                    >
                      {
                        platforms.map(platform => {
                          return <option
                            key={platform.name}
                            value={platform.name}
                            inputprops={{ style: { textTransform: 'capitalize' } }}
                          >
                            {platform.name}
                          </option>;
                        })
                      }
                    </TextField>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Partner ID"
                      name="partnerId"
                      type="text"
                      variant="outlined"
                      onChange={handleChange}
                      value={values.partnerId}
                      error={Boolean(touched.partnerId && errors.partnerId)}
                      helperText={touched.partnerId && errors.partnerId}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Partner Secret"
                      name="partnerSecret"
                      type="password"
                      variant="outlined"
                      onChange={handleChange}
                      value={values.partnerSecret}
                      error={Boolean(touched.partnerSecret && errors.partnerSecret)}
                      helperText={touched.partnerSecret && errors.partnerSecret}
                    />
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

  const Wrapper = () => {
    return <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      {content}
    </Box>;
  };

  const Error = () => {
    return <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert severity="error" sx={{ width: '100%' }}>
        Error while loading content
      </Alert>
    </Snackbar>;
  };

  const NoPlatform = () => {
    return <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert severity="error" sx={{ width: '100%' }}>
        No platform configured
      </Alert>
    </Snackbar>;
  }

  const Result = () => {
    switch (page) {
      case PAGE_LOADING:
        return <LoggingIn backgroundColor="background.default" />;

      case PAGE_ERROR:
        return <Error />;

      case PAGE_NO_PLATFORM:
        return <NoPlatform />;

      case PAGE_CONTENT:
        return <Wrapper />;

      default:
        return <Error />;
    }
  };

  return <Result />;
};

export default LinkingAdd;