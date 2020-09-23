import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';

export const ImageListItemLink = (props) => {
    const {icon, primary, to} = props;

    const renderLink = React.useMemo(() =>
        React.forwardRef((itemProps, ref) => (
            <RouterLink to={to} {...itemProps} innerRef={ref} />
        )),
    [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

ImageListItemLink.propTypes = {
    icon: PropTypes.node.isRequired,
    primary: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};
