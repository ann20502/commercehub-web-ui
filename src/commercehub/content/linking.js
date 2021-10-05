import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import Template from "../template/template";

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
})

const Linking = () => {

    const defaultPlatforms = [];
    const [platforms, setPlatforms] = useState(defaultPlatforms);
    const { getAccessTokenSilently } = useAuth0();

    const getLinking = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(
                '/linking',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const linking = await response.json();
            setPlatforms(linking);
            console.log("platforms", linking);
        } catch(error) {
            console.log("failed to get linking", error);
        }
    };

    useEffect(() => {
        if ( platforms.length <= 0 ) { getLinking(); }
    });

    const onClickLink = async (platform) => {
        const currentUri = window.location.href;

        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(
                '/link/login/' + platform + '?redirectUri=' + currentUri,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const result = await response.json();
            window.location.replace(result.uri);
        } catch(error) {
            console.log("failed to get auth url", error);
        }
    };

    const onClickUnlink = async (platform) => {
        const currentUri = window.location.href;

        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(
                '/unlink/login/' + platform + '?redirectUri=' + currentUri,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const result = await response.json();
            window.location.replace(result.uri);
        } catch(error) {
            console.log("failed to get auth cancellation url", error);
        }
    };

    const getContent = () => {
        if ( platforms.length <= 0 ) { return <div></div>; }

        const result = platforms.map(platform => {

            const shopName = platform.shopName ? platform.shopName : '-';
            const shopStatus = platform.status ? 'Active' : '-';
            const button = platform.status ?
                <Button size="small" onClick={() => onClickUnlink(platform.platform)}>Unlink</Button>
                : <Button size="small" onClick={() => onClickLink(platform.platform)}>Link</Button>;

            return <Grid item xs={12} md={6} lg={3} key={platform.platform}>
                <Card>
                    <MyCardMedia
                        component="img"
                        alt="Platform Image"
                        image={platform.logo}
                        />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div"><Title>{platform.platform}</Title></Typography>
                        <TypographyEllipsis variant="body2" color="text.secondary">
                            <span>Shop Name: {shopName}</span>
                            <br/>
                            <span>Shop Status: {shopStatus}</span>
                        </TypographyEllipsis>
                    </CardContent>
                    <CardActions sx={{justifyContent: 'center'}}>
                        {button}
                    </CardActions>
                </Card>
            </Grid>
        });

        const container =
        <Grid container spacing={4}>
            {result}
        </Grid>;

        return container;
    }

    const result = <Template headerName="linking">{getContent()}</Template>;
    return result;
};

export default Linking;