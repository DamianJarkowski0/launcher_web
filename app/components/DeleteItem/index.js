import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

const DeleteItem = (props) => {
    const {deleteItem} = props;
    const [toggle, setToggle] = React.useState();

    const handleConfirmation = () => {
        setToggle(!toggle);
        deleteItem();
    };

    return (
        <div>
            {(!toggle ?
                <IconButton aria-label="delete" size="small" onClick={() => setToggle(!toggle)}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
                : (<div>
                    <Grid container>
                        <IconButton aria-label="Check" size="small" onClick={() => handleConfirmation()}>
                            <Check fontSize="inherit" color="primary" />
                        </IconButton>
                        <IconButton aria-label="Close" size="small" onClick={() => setToggle(!toggle)}>
                            <Close fontSize="inherit" color="secondary" />
                        </IconButton>
                    </Grid>
                </div>)
            )}
        </div>
    );
};

export default DeleteItem;

DeleteItem.propTypes = {deleteItem: PropTypes.func};
