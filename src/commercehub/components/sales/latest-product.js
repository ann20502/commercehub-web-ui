// import { Avatar, Box, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, styled, Typography } from "@mui/material";
import { Box, Card, CardContent, CardHeader, Divider, styled, Typography } from "@mui/material";
import React from "react";

const LatestProduct = (props) => {

  const CustomCardHeader = styled(CardHeader)(({ theme }) => ({
    '& .MuiCardHeader-action': {
      alignSelf: 'center'
    }
  }));

  return (
    <Card {...props}>
      <CustomCardHeader
        title="Latest Products"
        sx={{
          alignItems: "center"
        }}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 'auto',
            position: 'relative'
          }}
        >
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            TODO
          </Typography>
          {/* <List
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {["Dayone", "Everything House"].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListSubheader disableGutters>{sectionId}</ListSubheader>
                  {["Product Name 1", "Product Name 2", "Product Name 3"].map((item) => (
                    <ListItem
                      disableGutters
                      key={`item-${sectionId}-${item}`}
                      secondaryAction={`10 views`}
                    >
                      <ListItemAvatar>
                        <Avatar alt="avatar" src="/static/images/avatar/2.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item}
                        secondary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Product Description
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List> */}
        </Box>
      </CardContent>
    </Card>
  );

};

export default LatestProduct;