import React from 'react';
import {ListItem, ListItemText} from '@material-ui/core';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';

const Link = React.forwardRef(
    (props, ref) => <RouterLink {...props} innerRef={ref} />);

export const ListItemLink = (props) => {
    const {primary, to} = props;

    return (
        <li>
            <ListItem button component={Link} to={to}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

ListItemLink.propTypes = {
    primary: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};
