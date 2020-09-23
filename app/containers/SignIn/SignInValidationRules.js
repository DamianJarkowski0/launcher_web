export const validate = (values) => {
    const errors = {};

    if (values.success === undefined) {
        if (!values.login) {
            errors.login = 'formLoginError1';
        } else if (/[-!@$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(values.login)) {
            errors.login = 'formLoginError2';
        }

        if (!values.password) {
            errors.password = 'formPasswordError';
        }
    }

    if (values.success === false) {
        if (values.message) {
            errors.authError = values.message;
        }
    }

    return errors;
};
