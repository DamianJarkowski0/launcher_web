import {makeStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {green,red} from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {display: 'flex', overflow: 'hidden'},
    toolbar: {paddingRight: 24},
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: 240,
        width: `calc(100% - 240px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    footerBar: {
        position: 'fixed',
        marginTop: 'calc(100vh - 64px)',
        marginLeft: 240,
        width: `calc(100% - ${theme.spacing(9)}px)`,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    footerBarShift: {
        position: 'fixed',
        marginTop: 'calc(100vh - 64px)',
        marginLeft: 240,
        width: `calc(100% - 240px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {marginRight: theme.spacing(2)},
    menuButtonHidden: {display: 'none'},
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {display: 'block'},
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        minHeight: 'calc(100vh)',
        maxHeight: 'calc(100vh)',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        minHeight: 'calc(100vh)',
        maxHeight: 'calc(100vh)',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {width: theme.spacing(9)},
    },
    appBarSpacer: {marginTop: 'calc(64px)'},
    content: {
        flexGrow: 1,
        maxHeight: 'calc(100vh - 64px)',
        overflow: 'hidden',
    },
    container: {
        paddingTop: theme.spacing(0),
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
    },
    paper: {
        background: 'transparent',
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        boxShadow: 'none',
        maxHeight: 'calc(100vh - 138px)',
    },
    fixedHeight: {height: 240},

    grow: {flexGrow: 1},
    search: {
        "position": 'relative',
        "borderRadius": theme.shape.borderRadius,
        "backgroundColor": fade(theme.palette.common.white, 0.15),
        '&:hover': {backgroundColor: fade(theme.palette.common.white, 0.25)},
        "marginRight": theme.spacing(2),
        "marginLeft": 0,
        "width": '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {color: 'inherit'},
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {width: 200},
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {display: 'flex'},
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {display: 'none'},
    },
}));

export const appTheme = {
    ["DARK"]: {
        palette: {
            type: "dark",
            primary: {
                main: green[500],
                contrastText: "#fff",
            },
            secondary: {
                main: red[600],
                contrastText: "#fff",
            },
            error: {
                main: red[900],
                contrastText: "#fff",
            },
        },
    },
    ["LIGHT"]: {
        palette: {
            type: "light",
            primary: {
                main: green[500],
                contrastText: "#fff",
            },
            secondary: {
                main: red[600],
                contrastText: "#fff",
            },
            error: {
                main: red[900],
                contrastText: "#fff",
            },
        },
    },
};
