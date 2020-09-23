import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {AppBar, Toolbar, Typography, CssBaseline, Icon} from '@material-ui/core';

export const Footer = (props) => {
    const {classes, open} = props;

    return (
        <div>
            <CssBaseline />
            <AppBar className={
                clsx(classes.footerBar ,open && classes.footerBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6"
                        color="inherit" noWrap className={classes.title}>
                        <Icon>copyright</Icon> 2019 IBC - Games
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export const FooterLite = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <Icon>copyright</Icon> 2019 IBC - Games
        </Typography>
    );
};

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
};
