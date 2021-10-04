import { Fab, Modal, Slide } from "@mui/material";
import { Box, styled } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import { Link } from "react-router-dom";

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
    backgroundColor: '#fff',
    height: '100%'
});

const TemplateMenu = () => {
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen(!open);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const icon = open ? <CloseIcon/> : <MenuIcon/>;

    return <div>
        <MyFab color="secondary" onClick={() => toggle()}>
            {icon}
        </MyFab>
        <Modal
            open={open}
            onClose={handleClose}>
                <Slide direction="up" in={open}>
                    <MyBox>
                        <div><Link to="/linking">Linking Page</Link></div>
                        <div><Link to="/sales">Sales Overview</Link></div>
                    </MyBox>
                </Slide>
        </Modal>
    </div>;
}

export default TemplateMenu;