import {useState} from 'react';
import {fetchDataFromServer} from '../../utils';

const useUserSearch = () => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        const LocalStorage = require('node-localstorage').LocalStorage;

        localStorage = new LocalStorage('./scratch');
    }
    const [users, setUsers] = useState();
    const [error, setError] = useState();

    const fetchUsers = () => {
        if (!error) {
            fetchDataFromServer(`user/list`, 'GET').then((res) => {
                if (res.success) {
                    localStorage.setItem('userList', JSON.stringify(res.message));
                    setUsers(res.message);
                } else {
                    setError((error) => ({...error, basic: res.message}));
                }
            });
        }
    };

    const fetchUpdatedAt = () => {
        return new Promise((resolve, reject) => {
            if (!error) {
                fetchDataFromServer(`user/list/lastupdate`, 'GET').then((res) => {
                    if (res.success) {
                        resolve(new Date(res.message.updated_at));
                    } else {
                        setError((error) => ({...error, basic: res.message}));
                        reject(new Error(res.message));
                    }
                });
            }
        });
    };

    const updateUserList = () => {
        if (!error) {
            fetchUpdatedAt().then((updatedAt) => {
                if (localStorage.getItem('userListUpdateTime') !== null) {
                    const updateTime = new Date(localStorage.getItem('userListUpdateTime'));

                    if (localStorage.getItem('userList') !== null) {
                        if (updateTime < updatedAt) {
                            fetchUsers();
                            localStorage.setItem('userListUpdateTime',updatedAt);
                        } else {
                            setUsers(JSON.parse(localStorage.getItem('userList')));
                        }
                    } else {
                        fetchUsers();
                    }
                } else {
                    fetchUsers();
                    localStorage.setItem('userListUpdateTime', updatedAt);
                }
            });
        }
    };

    return {
        users,
        updateUserList,
    };
};

export default useUserSearch;
