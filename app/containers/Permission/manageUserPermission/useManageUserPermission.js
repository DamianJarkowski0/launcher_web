import {useState, useEffect} from 'react';
import {fetchDataFromServer} from '../../../utils';

const useManageUserPermission = () => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        const LocalStorage = require('node-localstorage').LocalStorage;

        localStorage = new LocalStorage('./scratch');
    }
    const [user, setUser] = useState();
    const [groups, setGroups] = useState();
    const [error, setError] = useState({});
    const [permissions, setPermissions] = useState([]);
    const [userPermissions, setUserPermissions] = useState([]);
    const [userGroup, setUserGroup] = useState();

    useEffect(() => {
        if (userPermissions) {
            setError({});
            updatePermissionsForUser();
        }
    }, [userPermissions]);

    useEffect(() => {
        if (user) {
            setError({});
            fetchPermissions();
            fetchGroups();
            fetchUser(user.username);
        }
    }, [user, userGroup]);

    const selectUser = (user) => {
        setUser(user);
    };
    const fetchGroups = () => {
        fetchDataFromServer(`permission/getGroupsWithPermissions`, 'GET').then((res) => {
            if (res.success) {
                setGroups(res.message);
            } else {
                setError((error) => ({...error, basic: res.message}));
            }
        });
    };
    const fetchPermissions = () => {
        fetchDataFromServer(`permission/list/get`, 'GET').then((res) => {
            if (res.success) {
                setPermissions([]);
                setPermissions(res.message);
            } else {
                setError((error) => ({...error, basic: res.message}));
            }
        });
    };
    const fetchUser = (userName) => {
        fetchDataFromServer(`user/get/${userName}`, 'GET').then((res) => {
            if (res.success) {
                setUserPermissions(res.message.permission);
                setUserGroup(res.message.group_id);
                setUser(user);
            } else {
                setUser(undefined);
                setError((error) => ({...error, basic: res.message}));
            }
        });
    };

    const updateUserGroup = (userId, groupId) => {
        if (userId !== undefined && groupId !== undefined) {
            fetchDataFromServer(`permission/updateUserGroup`, 'POST',
                {user: userId, group: groupId}).then((res) => {
                if (res.success) {
                    if (res.message.message !== "GROUPUPDATED") {
                        setError((error) => ({...error, message: res.message, id: 0}));
                    } else {
                        setUserGroup(groupId);
                    }
                } else {
                    setError((error) => ({...error, message: res.message, id: 0}));
                }
            });
        }
    };

    const updatePermissionsForUser = () => {
        (userPermissions && userPermissions.map((permission) => {
            (permissions && permissions.map((perm) => {
                if (perm.name === permission) {
                    const newPermissions = [...permissions];

                    perm.active = true;
                    newPermissions[permissions.indexOf(perm)] = perm;
                    setPermissions(newPermissions);

                    return;
                }
            }));
        }));
    };

    const updateUserPermission = (user, item) => {
        if (user !== undefined && item !== undefined) {
            fetchDataFromServer(`permission/updateUserPermission`, 'POST', {[`${user.id}`]: [item]}).then((res) => {
                if (res.success) {
                    updatePermissionsForUser(item);
                } else {
                    setError((error) => ({...error, message: res.message, id: item.id}));
                    updatePermissionsForUser(item);
                }
            });
        }
    };

    return {
        user,
        groups,
        permissions,
        error,
        selectUser,
        updateUserGroup,
        updateUserPermission,
    };
};

export default useManageUserPermission;
