import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Toolbar, InputBase, MenuItem,
    FormControl, Select, Grid,
} from '@material-ui/core';
import DeleteItem from '../../../components/DeleteItem';
import {useStyles} from '../style';
import {useTranslation} from 'react-i18next';

const Item = (props) => {
    const {handleChange, type, types, deleteItem, error} = props;
    const [classes] = useState(useStyles());
    const [item, setItem] = useState(props.item);
    const [isEditable, setEditable] = useState(false);
    const {t} = useTranslation();

    if (!item.type_id && item.type) {
        setItem({...item, type_id: item.type.id});
    }

    if (!item.name && !isEditable) {
        setEditable(true);
    }

    const handleUpdate = () => {
        setEditable(false);
        if ((type === 'list' && item.type_id && item.name) || (type !== 'list' && item.name)) {
            handleChange(type, item);
            if (!item.id) {
                setItem({});
            }
        }
    };

    const updateName = (e) => {
        setItem({...item, name: e.target.value});
    };

    const changeType = (e) => {
        setItem({...item, type_id: e.target.value});
    };

    const handleDeleteItem = () => {
        deleteItem(type, item);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Grid container>
                        {(item.id && <DeleteItem deleteItem={handleDeleteItem}/>)}
                        <Grid item xs={3}>
                            {(isEditable ?
                                <div className={classes.input} >
                                    <InputBase
                                        value={item.name || ""}
                                        onChange={updateName}
                                        placeholder="Add new"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        autoFocus
                                        onBlur={() => handleUpdate()}
                                    />
                                </div>
                                :
                                <div onClick={() => setEditable(true)}>{item.name}</div>)}
                        </Grid>
                        {(type === 'list' && types &&
                        <Grid item xs={3}>
                            <FormControl>
                                <Select
                                    value={item.type_id || ""}
                                    onChange={changeType}
                                    className={classes.select}
                                    onBlur={() => handleUpdate()}
                                >
                                    {types.map((type,index) => {
                                        return (<MenuItem key={index} value={type.id}>{type.name}</MenuItem>);
                                    })};
                                </Select>
                            </FormControl>
                        </Grid>
                        )}
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
    handleChange: PropTypes.func,
    type: PropTypes.string,
    item: PropTypes.object,
    types: PropTypes.array,
    deleteItem: PropTypes.func,
    error: PropTypes.any,
};
