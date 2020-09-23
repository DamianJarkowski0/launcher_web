import {useState, useEffect} from 'react';
import {fetchDataFromServer} from '../../../utils';

const useBasic = () => {
    const [basic, setBasic] = useState({});
    const [error, setError] = useState({});

    useEffect(() => {
    }, []);
    const clearError = () => {
        setError({});
    };

    const fetchData = (name) => {
        if (name !== undefined) {
            fetchDataFromServer(`permission/${name}/get`, 'GET').then((res) => {
                if (res.success) {
                    setBasic((basic) => ({...basic, [name]: res.message}));
                } else {
                    setError((error) => ({...error, basic: res.message}));
                }
            });
        }
    };

    const updateBasicItem = (type, item) => {
        if (type !== undefined && item !== undefined) {
            setError({});
            fetchDataFromServer(`permission/${type}/update`, 'PUT', [item]).then((res) => {
                if (res.success) {
                    setBasic((basic) => ({...basic, [name]: res.message}));
                    fetchData(type);
                } else {
                    setError((error) => ({...error, message: res.message, id: item.id}));
                    fetchData(type);
                }
            });
        }
    };

    const addBasicItem = (type, item) => {
        if (type !== undefined && item !== undefined) {
            setError({});
            fetchDataFromServer(`permission/${type}/add`, 'POST', [item]).then((res) => {
                if (res.success) {
                    setBasic((basic) => ({...basic, [name]: res.message}));
                    if (!res.message[0].id) {
                        setError((error) => ({...error, message: res.message[0].message, id: item.id}));
                    }
                    fetchData(type);
                } else {
                    setError((error) => ({...error, message: res.message, id: item.id}));
                    fetchData(type);
                }
            });
        }
    };

    const deleteItem = (type, item) => {
        if (type !== undefined && item !== undefined) {
            console.log(item);
            fetchDataFromServer(`permission/${type}/delete`, 'DELETE', [item]).then((res) => {
                if (res.success) {
                    setBasic((basic) => ({...basic, [name]: res.message}));
                    if (!res.message[0].id) {
                        setError((error) => ({...error, message: res.message[0].message, id: item.id}));
                    }
                    fetchData(type);
                } else {
                    setError((error) => ({...error, message: res.message, id: item.id}));
                    fetchData(type);
                }
            });
        }
    };

    return {
        basic,
        error,
        fetchData,
        updateBasicItem,
        addBasicItem,
        deleteItem,
        clearError,
    };
};

export default useBasic;
