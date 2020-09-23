export const validate = (values) => {
    const errors = {};

    if (values.success === undefined) {
        if (!values.login) {
            errors.login = 'formFieldRequired';
        } else if (values.login.length < 4) {
            errors.login = 'formLoginLength';
        }

        if (!values.email) {
            errors.email = 'formFieldRequired';
        } else if (!validateEmail(values.email)) {
            errors.email = 'formEmailError';
        }

        if (!values.password) {
            errors.password = 'formFieldRequired';
        } else if (values.password.length < 8) {
            errors.password = 'formPasswordLength';
        }

        if (!values.repeatPassword) {
            errors.repeatPassword = 'formFieldRequired';
        } else if (values.repeatPassword.length < 8) {
            errors.repeatPassword = 'formPasswordLength';
        } else if (values.repeatPassword !== values.password) {
            errors.repeatPassword = 'formPasswordNotEqual';
        }

        if (!values.terms) {
            errors.terms = 'formTermsRequired';
        }
    }

    if (values.success === false) {
        if (values.message) {
            errors.signError = values.message;
        }
    }

    return errors;
};

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
};
