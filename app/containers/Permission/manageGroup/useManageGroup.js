import {useState} from 'react';
import {fetchDataFromServer} from '../../../utils';

const useManageGroup = () => {
    const [groups, setGroups] = useState();
    const [permissions, setPermissions] = useState();
    const [error, setError] = useState({});

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
                setPermissions(res.message);
            } else {
                setError((error) => ({...error, basic: res.message}));
            }
        });
    };

    const updatePermissionsForGroup = (groupName) => {
        if (groupName) {
            groups.map((group) => {
                if (group.name === groupName) {
                    (group.permission && group.permission.map((permission) => {
                        (permissions && permissions.map((perm) => {
                            if (perm.id === permission.id) {
                                const newPermissions = [...permissions];

                                perm.active = permission.opt.active;
                                newPermissions[permissions.indexOf(perm)] = perm;
                                setPermissions(newPermissions);

                                return;
                            }
                        }));
                    }));

                    return;
                }
            });
        }
    };

    const updatePermissionInGroup = (group, item) => {
        if (group !== undefined && item !== undefined) {
            setError({});
            fetchDataFromServer(`permission/updatePermissionInGroup`, 'POST', {[`${group.id}`]: [item]}).then((res) => {
                if (res.success) {
                    updatePermissionsForGroup(item);
                } else {
                    setError((error) => ({...error, message: res.message, id: item.id}));
                    updatePermissionsForGroup(item);
                }
            });
        }
    };

    return {
        error,
        groups,
        permissions,
        fetchGroups,
        fetchPermissions,
        updatePermissionsForGroup,
        updatePermissionInGroup,
    };
};

export default useManageGroup;
