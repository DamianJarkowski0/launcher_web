import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Toolbar, FormControlLabel,
    Grid, Checkbox,
} from '@material-ui/core';
import {useStyles} from '../style';
import {useTranslation} from 'react-i18next';

const Item = (props) => {
    const {handleUpdate, user, error} = props;
    const [classes] = useState(useStyles());
    const [item, setItem] = useState(props.item);
    const {t} = useTranslation();

    const handleChange = () => {
        setItem((item) => ({...item, active: !item.active}));
        handleUpdate(user, {...item, active: !item.active});
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={item.active || false}
                                        onChange={() => handleChange()}
                                        value={item}
                                        color="primary"
                                    />
                                }
                                label={item.name}
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {error && <AppBar position="static" color="secondary">
                <Toolbar>{t(`permission:${error}`)}</Toolbar></AppBar>}
        </div>
    );
};

export default Item;

Item.propTypes = {
    handleUpdate: PropTypes.func,
    item: PropTypes.object,
    user: PropTypes.object,
    error: PropTypes.any,
};
