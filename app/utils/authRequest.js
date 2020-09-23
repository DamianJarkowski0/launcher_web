import Cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';

export const loginUser = async (login, password) => {
    const response = await fetch(`${CONFIG.AUTH_PROTOCOL}://${CONFIG.AUTH_IP}/user/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: login,
            password: password,
        }),
    });
    const contents = await response.json();

    return contents;
};

export const registerUser = (username, password, email, token) => {
    return fetch(`${CONFIG.AUTH_PROTOCOL}://${CONFIG.AUTH_IP}/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            token: token,
        }),
    }).then((response) => response.json())
        .then((contents) => {
            return contents;
        });
};

export const getUserData = (username) => {
    return fetch(`${CONFIG.SERVER_PROTOCOL}://${CONFIG.SERVER_IP}/user/get/${username}`, {
        method: 'GET',
        mode: 'cors',
        headers: {Authorization: `bearer ${Cookies.get('jwt')}`},
    }).then((response) => response.json())
        .then((contents) => {
            return contents;
        });
};
