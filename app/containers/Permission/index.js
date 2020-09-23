import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {AppBar, Tabs, Tab, Paper, Box, Typography} from '@material-ui/core';
import Basic from './basic';
import ManageGroup from './manageGroup';
import ManageUserPermission from './manageUserPermission';
import {useStyles} from './style';

const TabPanel = (props) => {
    const {children, value, index} = props;

    return (
        <Typography component="div"
            hidden={value !== index}>
            <Box p={1}>{children}</Box>
        </Typography>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Permissions = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <Paper className={classes.root}>
            <AppBar position="static" color="default" >
                <Tabs
                    value={value}
                    onChange={(evt, val) => setValue(val)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered>
                    <Tab label="Manage basic configuration"/>
                    <Tab label="Manage Groups"/>
                    <Tab label="Manage user permission"/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={value}
                onChangeIndex={(index) => setValue(index)}>
                <TabPanel value={value} index={0} ><Basic/></TabPanel>
                <TabPanel value={value} index={1} ><ManageGroup/></TabPanel>
                <TabPanel value={value} index={2} ><ManageUserPermission/></TabPanel>
            </SwipeableViews>
        </Paper>
    );
};

export default Permissions;
