import React from 'react';
import useOnLogin from './useSignIn';
import {
    Avatar, Button, CssBaseline, TextField, FormControlLabel,
    Checkbox, Box, Typography, Container, FormHelperText,
    CircularProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import {useStyles} from './Style';
import {FooterLite} from '../../components/Footer';

const SignIn = () => {
    const {values, errors, handleChange, handleSubmit} = useOnLogin();
    const {t} = useTranslation();
    const style = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <Helmet>
                <title>Login Page</title>
                <meta name="description" content="A Login page" />
            </Helmet>

            <CssBaseline />

            <div className={style.paper}>
                <Avatar className={style.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('signin:login')}
                </Typography>
                <form className={style.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        onChange={handleChange}
                        value={values.login || ''}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label={t('signin:formLogin')}
                        name="login"
                        autoComplete="login"
                        autoFocus
                        error={errors.login !== undefined}
                    />
                    {errors.login && (
                        <FormHelperText id="component-error-text" error>{t(`signin:${errors.login}`)}</FormHelperText>
                    )}
                    <TextField
                        onChange={handleChange}
                        value={values.password || ''}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('signin:formPassword')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={errors.password !== undefined}
                    />
                    {errors.password && (
                        <FormHelperText id="component-error-text" error>
                            {t(`signin:${errors.password}`)}
                        </FormHelperText>
                    )}
                    <FormControlLabel
                        control={<Checkbox
                            onChange={handleChange}
                            checked={values.remember || false} color="primary" />}
                        name="remember"
                        value="remember"
                        label={t('signin:formRemember')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={style.submit}
                        disabled={values.signing}
                    >
                        {values.signing && (<CircularProgress color="secondary"/>)}
                        {!values.signing && (t('signin:signin'))}
                    </Button>
                    {errors.authError && (
                        <FormHelperText id="component-error-text" error>
                            {t(`signin:${errors.authError}`)}
                        </FormHelperText>
                    )}
                </form>
            </div>
            <Box mt={5}>
                <FooterLite />
            </Box>
        </Container>
    );
};

export default SignIn;
