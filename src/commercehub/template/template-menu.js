import { Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Modal, Slide } from "@mui/material";
import { Box, styled } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import { Link } from "react-router-dom";
import LinkIcon from '@mui/icons-material/Link';
import AnalyticssIcon from '@mui/icons-material/Analytics';

const MyFab = styled(Fab)({
    margin: '0',
    top: 'auto',
    left: 'auto',
    bottom: '7%',
    right: '5%',
    position: 'fixed',
    zIndex: 1301
});

const MyBox = styled(Box)({
    padding: '1.5rem 5%',
    backgroundColor: '#f6efe8',
    height: '100%'
});

const TemplateMenu = () => {
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen(!open);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const icon = open ? <CloseIcon/> : <MenuIcon/>;

    const menu =
    <List
      subheader={
        <ListSubheader sx={{fontSize: '1.8rem', paddingX: '32px', fontWeight: 'bold', color: '#9c27b0', backgroundColor: 'transparent'}}>Menu</ListSubheader>
        }>
        <ListItem>
            <ListItemButton component={Link} to="/sales">
                <ListItemIcon>
                    <AnalyticssIcon/>
                </ListItemIcon>
                <ListItemText primary="Sales Overview"/>
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton component={Link} to="/linking">
                <ListItemIcon>
                    <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary="Linking"/>
            </ListItemButton>
        </ListItem>
    </List>;

    return <div>
        <MyFab color="secondary" onClick={() => toggle()}>
            {icon}
        </MyFab>
        <Modal
            open={open}
            onClose={handleClose}>
                <Slide direction="up" in={open}>
                    <MyBox>
                        {menu}
                    </MyBox>
                </Slide>
        </Modal>
    </div>;
}

export default TemplateMenu;