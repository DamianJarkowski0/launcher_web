import {useState, useEffect} from 'react';
import {validate} from './SignInValidationRules';
import {loginUser,getUserData} from '../../utils/authRequest';
import Cookies from 'js-cookie';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../reducers/user.action';

const useOnLogin = () => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(errors).length === 0 && values.message !== undefined) {
            setErrors(validate(values));
            setValues((values) => ({...values, message: undefined}));
        }
        if (Object.keys(errors).length === 0 && isSubmitting && !values.signing) {
            setValues((values) => ({...values, signing: true}));
            setIsSubmitting(false);

            loginUser(values.login,values.password,values.remember).then((res) => {
                if (res.success) {
                    if (values.remember) {
                        Cookies.set('jwt', `${res.message}`,{expires: 14});
                        Cookies.set('username',`${values.login}`,{expires: 14});
                    } else {
                        Cookies.set('jwt',`${res.message}`);
                        Cookies.set('username',`${values.login}`);
                    }
                    setValues((values) => ({...values, signing: false}));

                    getUserData(values.login).then((user) => {
                        dispatch(updateUser(user.message));
                    });
                } else {
                    setValues((values) => ({...values, success: res.success}));
                    setValues((values) => ({...values, signing: false}));
                    setValues((values) => ({...values, message: res.message}));
                }
            }).catch(() => {
                setValues((values) => ({...values, success: false}));
                setValues((values) => ({...values, signing: false}));
                setValues((values) => ({...values, message: "TIMEDOUT"}));
            });
        }
    },[errors,values]);

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        setErrors(validate(values));
        setIsSubmitting(true);
    };

    const handleChange = (event) => {
        event.persist();
        if (event.target.name === "remember") {
            setValues((values) => ({...values, [event.target.name]: event.target.checked}));
        } else {
            setValues((values) => ({...values, [event.target.name]: event.target.value}));
        }
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    };
};

export default useOnLogin;
