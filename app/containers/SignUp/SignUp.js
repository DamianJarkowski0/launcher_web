import React from 'react';
import {
    Avatar, Button, CssBaseline, TextField, FormControlLabel,
    Checkbox, Link, Grid, Box, Typography, Container, Paper,
    FormHelperText, CircularProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useStyles} from './Style';
import useSignUp from './useSignUp';
import {useTranslation} from 'react-i18next';
import {FooterLite} from '../../components/Footer';
import {Helmet} from 'react-helmet';

const SignUp = () => {
    const {values, errors, handleChange, handleSubmit} = useSignUp();
    const {t} = useTranslation();
    const classes = useStyles();

    if (values.registered !== undefined && values.registered) {
        return (
            <Container component="main" maxWidth="xs">
                <Helmet>
                    <title>Registration Page</title>
                    <meta name="description" content="A registration page" />
                </Helmet>

                <CssBaseline />

                <div className={classes.paper}>
                    <Paper className={classes.registeredInfo}>
                        <Typography variant="h5" component="h3">
                            {t('signup:userRegistered')}
                        </Typography>
                    </Paper>
                </div>
                <Box mt={5}>
                    <FooterLite />
                </Box>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <Helmet>
                <title>Registration Page</title>
                <meta name="description" content="A registration page" />
            </Helmet>

            <CssBaseline />

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
          Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                id="login"
                                name="login"
                                label={t('signup:formLogin')}
                                value={values.login || ''}
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                                error={errors.login !== undefined}
                            />
                            {errors.login && (
                                <FormHelperText id="component-error-text" error>
                                    {t(`signup:${errors.login}`)}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                id="email"
                                name="email"
                                label={t('signup:formEmail')}
                                value={values.email || ''}
                                variant="outlined"
                                required
                                fullWidth
                                error={errors.email !== undefined}
                            />
                            {errors.email && (
                                <FormHelperText id="component-error-text" error>
                                    {t(`signup:${errors.email}`)}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                id="password"
                                name="password"
                                label={t('signup:formPassword')}
                                type="password"
                                value={values.password || ''}
                                variant="outlined"
                                required
                                fullWidth
                                error={errors.password !== undefined}
                            />
                            {errors.password && (
                                <FormHelperText id="component-error-text" error>
                                    {t(`signup:${errors.password}`)}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                id="repeatPassword"
                                name="repeatPassword"
                                label={t('signup:formRepeatPassword')}
                                type="password"
                                value={values.repeatPassword || ''}
                                variant="outlined"
                                required
                                fullWidth
                                error={errors.repeatPassword !== undefined}
                            />
                            {errors.repeatPassword && (
                                <FormHelperText id="component-error-text" error>
                                    {t(`signup:${errors.repeatPassword}`)}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={handleChange}
                                        checked={values.terms || false}
                                        value="terms"
                                        color="primary"
                                    />}
                                name="terms"
                                value="terms"
                                label={t('signup:formTerms')}
                                error={errors.terms ? '' : undefined }
                            />
                            {errors.terms && (
                                <FormHelperText id="component-error-text" error>
                                    {t(`signup:${errors.terms}`)}
                                </FormHelperText>
                            )}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                        className={classes.submit}
                        disabled={values.registering}
                        onClick={handleSubmit}
                    >
                        {values.registering && (<CircularProgress color="secondary"/>)}
                        {!values.registering && (t('signup:formSignUp'))}
                    </Button>
                    {errors.signError && (
                        <FormHelperText id="component-error-text" error>
                            {t(`signup:${errors.signError}`)}
                        </FormHelperText>
                    )}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="login" variant="body2">
                                {t('signup:formAlreadyRegistered')}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <FooterLite />
            </Box>
        </Container>
    );
};

export default SignUp;
