import React, {useState} from 'react';
import useManageUserPermission from './useManageUserPermission';
import UserSearch from '../../../components/UserSearch';
import {useStyles} from '../style';
import Item from './item';
import {
    AppBar, Toolbar, Grid,
    MenuItem,InputLabel,
    FormControl, Select,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const GroupPane = React.memo((props) => {
    const {groups, handleChange, classes} = props;
    const [user, setUser] = useState(props.user);
    const {t} = useTranslation();

    const changeGroup = (e) => {
        setUser({...user, group_id: e.target.value});
        handleChange(user.id, e.target.value);
    };

    return (
        <AppBar position="static" color="inherit">
            <Toolbar>
                <Grid container>
                    <Grid item xs={1}>
                        <h3>{user.username}</h3>
                    </Grid>
                    <Grid item xs={1}>
                        <FormControl>
                            <InputLabel htmlFor="group-select-label">Group</InputLabel>
                            <Select
                                inputprops={{
                                    name: 'Group',
                                    id: 'group-select',
                                }}
                                value={user.group_id}
                                onChange={changeGroup}
                                className={classes.select}
                            >
                                {groups && groups.map((group,index) => {
                                    return (<MenuItem key={index} value={group.id}>{group.name}</MenuItem>);
                                })};
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
});

const ManageUserPermission = () => {
    const [classes] = useState(useStyles());
    const {
        user, groups, permissions, error,
        selectUser, updateUserGroup, updateUserPermission,
    } = useManageUserPermission();

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={3}>
                            <UserSearch classes={classes} selectUser={selectUser}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {error.basic && <AppBar position="static" color="secondary">
                <Toolbar>{t(`permission:${error.basic}`)}</Toolbar></AppBar>}
            {(user &&
                <GroupPane
                    user={user}
                    groups={groups}
                    handleChange={updateUserGroup}
                    classes={classes}
                />)}
            {user && permissions && permissions.map((item, index) => {
                return (<Item
                    key={index}
                    item={item}
                    user={user}
                    handleUpdate={updateUserPermission}
                    error={(error.id === item.id && error.message)}
                />);
            })
            }
        </div>
    );
};

export default React.memo(ManageUserPermission);
