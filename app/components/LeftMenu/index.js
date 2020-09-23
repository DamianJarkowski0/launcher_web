import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import {ImageListItemLink} from './ImageListItemLink';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import LockIcon from '@material-ui/icons/Lock';
import PropTypes from 'prop-types';
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Storage from '@material-ui/icons/Storage';
import clsx from 'clsx';
import {hasPermission} from '../../utils';

const LeftMenu = (props) => {
    const {classes, open, handleDrawerClose} = props;

    return (
        <div>
            <CssBaseline />
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper,
                        !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ImageListItemLink
                        to="/serverfilemanager"
                        primary="Server File Manager"
                        icon={<Storage />} />
                </List>
                <Divider />
                <List>
                    {hasPermission("MENU_ADMINISTRATION") &&
                            <ListSubheader inset>Administration</ListSubheader>}
                    {hasPermission("MENU_PERMISSION") ?
                        <ImageListItemLink
                            to="/permission"
                            primary="Permission"
                            icon={<LockIcon />} /> : <div></div>}
                    {/* <ListItemLink to="/trash" primary="Trash" /> */}
                </List>
            </Drawer>
        </div>
    );
};

export default LeftMenu;

LeftMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
