import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';

export const fetchDataFromServer = (path,method,body) => {
    return fetch(`${CONFIG.SERVER_PROTOCOL}://${CONFIG.SERVER_IP}/${path}`, {
        method: method,
        mode: 'cors',
        headers: {"Authorization": `bearer ${Cookies.get('jwt')}`, 'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    }).then((response) => response.json())
        .then((contents) => {
            return contents;
        });
};

export const hasPermission = (permission) => {
    const User = useSelector((store) => store.user);

    if (User.permission !== undefined) {
        if (User.permission.includes(permission)) {
            return true;
        }
    }
};
