import React from 'react';
import {Helmet} from 'react-helmet';
import Cookies from 'js-cookie';
import {Route, Switch} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import LeftMenu from '../../components/LeftMenu';
import {Footer} from '../../components/Footer';
import {useStyles, appTheme} from './Style';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn';
import Permission from '../Permission';
import ServerFileManager from '../ServerFileManager';
import PageNotFound from '../../components/404';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../reducers/user.action';
import {getUserData} from '../../utils/authRequest';
import Paper from '@material-ui/core/Paper';

const App = (props) => {
    const classes = useStyles();
    const history = props.history;
    const User = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const {username, jwt} = Cookies.get();

    //Auto login
    if (username && jwt && User.username !== username) {
        getUserData(username).then((user) => {
            dispatch(updateUser(user.message));
        });
    }

    //Menu left
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    //Theme
    if (Cookies.get("theme") === undefined) {
        Cookies.set("theme", "LIGHT");
    }

    const [theme, setTheme] = React.useState(Cookies.get("theme"));

    const toggleTheme = () => {
            setTheme(theme === "LIGHT" ? "DARK" : "LIGHT");
        },

        muiTheme = createMuiTheme(appTheme[theme]);

    return (
        <ThemeProvider theme={muiTheme}>
            <div>
                <Helmet
                    lang="pl"
                    titleTemplate="%s - IBC Gamse"
                    defaultTitle="IBC Games">
                    <meta name="description" content="IBC Games Web Client" />
                </Helmet>

                {User.username === 'Quest' && username === undefined ?
                    (
                        <ConnectedRouter history={history}>
                            <Switch>
                                <Route exact path="/" component={SignIn} />
                                <Route path="/register" component={SignUp} />
                                <Route path="/login" component={SignIn} />
                                <Route path="" component={SignIn} />
                            </Switch>
                        </ConnectedRouter>
                    ) : (
                        <ConnectedRouter history={history}>
                            <div className={classes.root}>
                                <CssBaseline />
                                <Header handleDrawerOpen={handleDrawerOpen}
                                    classes={classes} open={open}
                                    toggleTheme={toggleTheme} theme={theme} />
                                <LeftMenu handleDrawerClose={handleDrawerClose}
                                    open={open} classes={classes} />
                                <main className={classes.content}>
                                    <div className={classes.appBarSpacer} />
                                    <Paper
                                        className={classes.paper}>
                                        <Switch>
                                            <Route exact path="/"
                                                component={PageNotFound} />
                                            <Route exact path="/serverfilemanager"
                                                component={ServerFileManager} />
                                            <Route exact path="/permission"
                                                component={Permission} />
                                            <Route path=""
                                                component={PageNotFound} />
                                        </Switch>
                                    </Paper>
                                    <Footer classes={classes} open={open} />
                                </main>
                            </div>
                        </ConnectedRouter>
                    )
                }
            </div>
        </ThemeProvider>
    );
};

export default App;

App.propTypes = {history: PropTypes.any};
