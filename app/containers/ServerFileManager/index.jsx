import React from 'react';

import fetch from 'isomorphic-fetch';
// import useOnLogin from './useSignIn';
// import {
//     Avatar, Button, CssBaseline, TextField, FormControlLabel,
//     Checkbox, Box, Typography, Container, FormHelperText,
//     CircularProgress,
// } from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import {Helmet} from 'react-helmet';
// import {useTranslation} from 'react-i18next';
// import {useStyles} from './Style';
// import {FooterLite} from '../../components/Footer';

// const Client = require('ssh2').Client;
// const connection = new Client();
// const connSettings = {
//     host: '51.254.158.115',
//     port: 22, // Normal is 22 port
//     username: 'kisi',
//     password: 'yPjUdMs^6',
//     // You can use a key file too, read the ssh2 documentation
// };

const remotePathToList = '/var/www/ourcodeworld';

const ServerFileManager = () => {
    // fetch("https://localhost:30091/testAPI")
    // .then(res => res.text())
    // .then(res => console.log(res));
    const test = () => {
        fetch(`https://panel.d-ja.eu/testAPI`, {
            method: 'GET',
            mode: 'cors',
        }).then((response) =>
            response.json()
            // console.log(response);

        )
            .then((contents) => {
                console.log(contents);
            });
    };
    const test2 = () => {
        fetch(`https://panel.d-ja.eu/testAPI/down`, {
            method: 'GET',
            mode: 'cors',
        }).then((response) =>
            response.json()
            // console.log(response);

        )
            .then((contents) => {
                console.log(contents);
            });
    };
    // connection.on('ready', function() {
    //     conn.sftp(function(err, sftp) {
    //          if (err) throw err;
    //          // you'll be able to use sftp here
    //          // Use sftp to execute tasks like .unlink or chmod etc
    //     });
    // }).connect(connSettings);
    // const {values, errors, handleChange, handleSubmit} = useOnLogin();
    // const {t} = useTranslation();
    // const style = useStyles();

    // return (
    //     <Container component="main" maxWidth="xs">
    //         <Helmet>
    //             <title>Login Page</title>
    //             <meta name="description" content="A Login page" />
    //         </Helmet>

    //         <CssBaseline />

    //         <div className={style.paper}>
    //             <Avatar className={style.avatar}>
    //                 <LockOutlinedIcon />
    //             </Avatar>
    //             <Typography component="h1" variant="h5">
    //                 {t('signin:login')}
    //             </Typography>
    //             <form className={style.form} noValidate onSubmit={handleSubmit}>
    //                 <TextField
    //                     onChange={handleChange}
    //                     value={values.login || ''}
    //                     variant="outlined"
    //                     margin="normal"
    //                     required
    //                     fullWidth
    //                     id="login"
    //                     label={t('signin:formLogin')}
    //                     name="login"
    //                     autoComplete="login"
    //                     autoFocus
    //                     error={errors.login !== undefined}
    //                 />
    //                 {errors.login && (
    //                     <FormHelperText id="component-error-text" error>{t(`signin:${errors.login}`)}</FormHelperText>
    //                 )}
    //                 <TextField
    //                     onChange={handleChange}
    //                     value={values.password || ''}
    //                     variant="outlined"
    //                     margin="normal"
    //                     required
    //                     fullWidth
    //                     name="password"
    //                     label={t('signin:formPassword')}
    //                     type="password"
    //                     id="password"
    //                     autoComplete="current-password"
    //                     error={errors.password !== undefined}
    //                 />
    //                 {errors.password && (
    //                     <FormHelperText id="component-error-text" error>
    //                         {t(`signin:${errors.password}`)}
    //                     </FormHelperText>
    //                 )}
    //                 <FormControlLabel
    //                     control={<Checkbox
    //                         onChange={handleChange}
    //                         checked={values.remember || false} color="primary" />}
    //                     name="remember"
    //                     value="remember"
    //                     label={t('signin:formRemember')}
    //                 />
    //                 <Button
    //                     type="submit"
    //                     fullWidth
    //                     variant="contained"
    //                     color="primary"
    //                     className={style.submit}
    //                     disabled={values.signing}
    //                 >
    //                     {values.signing && (<CircularProgress color="secondary"/>)}
    //                     {!values.signing && (t('signin:signin'))}
    //                 </Button>
    //                 {errors.authError && (
    //                     <FormHelperText id="component-error-text" error>
    //                         {t(`signin:${errors.authError}`)}
    //                     </FormHelperText>
    //                 )}
    //             </form>
    //         </div>
    //         <Box mt={5}>
    //             <FooterLite />
    //         </Box>
    //     </Container>
    // );

    return (<div><button onClick={() => test()}>li</button><button onClick={() => test2()}>asd</button></div>);
};

export default ServerFileManager;
