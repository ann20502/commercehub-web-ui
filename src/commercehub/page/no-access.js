import { Box, Typography, Container } from '@mui/material';

const NoAccess = () => (
  <>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          403: Unauthorized Access
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
        >
          Please approach any of the system admin to gain access.
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="No Access"
            src="/static/images/undraw_access_denied_re_awnf.svg"
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default NoAccess;