import {withStyles} from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {fade, makeStyles} from '@material-ui/core/styles';

export const ExpansionPanel = withStyles({
    root: {
        "border": '1px solid rgba(0, 0, 0, .125)',
        "boxShadow": 'none',
        '&:not(:last-child)': {borderBottom: 0},
        '&:before': {display: 'none'},
        '&$expanded': {margin: 'auto'},
    },
    expanded: {},
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
    root: {
        "backgroundColor": 'rgba(0, 0, 0, .03)',
        "borderBottom": '1px solid rgba(0, 0, 0, .125)',
        "marginBottom": -1,
        "minHeight": 56,
        '&$expanded': {minHeight: 56},
    },
    content: {'&$expanded': {margin: '12px 0'}},
    expanded: {},
})(MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        maxHeight: '540px',
        overflow: 'auto',
    },
}))(MuiExpansionPanelDetails);

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 4,
        maxHeight: 'calc(100%)',
    },
    menuButton: {marginRight: theme.spacing(2)},
    title: {flexGrow: 1},
    inputRoot: {color: 'inherit'},
    inputInput: {
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {width: 200},
    },
    input: {
        "position": 'relative',
        "borderRadius": theme.shape.borderRadius,
        "backgroundColor": fade(theme.palette.common.white, 0.15),
        '&:hover': {backgroundColor: fade(theme.palette.common.white, 0.25)},
        "marginRight": theme.spacing(2),
        "marginLeft": 0,
        "width": '100%',
        [theme.breakpoints.up('sm')]: {width: 'auto'},
    },
    select: {
        minWidth: 240,
        maxWidth: 240,
    },
}));

