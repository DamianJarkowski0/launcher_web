import {useState, useEffect} from 'react';
import {validate} from './SignUpFormValidationRules';
import {info} from '../../utils/logger';
import useRecaptcha from 'react-recaptcha-hook';
import {registerUser} from '../../utils/authRequest';

const useSignUp = () => {
    const captcha = useRecaptcha({sitekey: CONFIG.RECAPTCHAKEY , hideDefaultBadge: false});

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && values.message !== undefined) {
            setErrors(validate(values));
        }
        if (Object.keys(errors).length === 0 && isSubmitting && !values.registering) {
            setValues((values) => ({...values, registering: true}));

            generateToken().then((token) => {
                setIsSubmitting(false);
                registerUser(values.login,values.password,values.email,token).then((res) => {
                    if (res.success) {
                        setValues((values) => ({...values, registered: true}));
                        setValues((values) => ({...values, registering: false}));
                    } else {
                        setValues((values) => ({...values, success: res.success}));
                        setValues((values) => ({...values, message: res.message}));
                        setValues((values) => ({...values, registering: false}));
                    }
                }).catch(() => {
                    setValues((values) => ({...values, success: false}));
                    setValues((values) => ({...values, registering: false}));
                    setValues((values) => ({...values, message: "TIMEDOUT"}));
                });
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
        if (event.target.name === "terms") {
            setValues((values) => ({...values, [event.target.name]: event.target.checked}));
        } else {
            setValues((values) => ({...values, [event.target.name]: event.target.value}));
        }
    };

    const generateToken = async () => {
        const token = await captcha();

        info(`ReCaptcha token: ${token}`,false);

        return token;
    };

    return {
        handleSubmit,
        handleChange,
        values,
        errors,
    };
};

export default useSignUp;
