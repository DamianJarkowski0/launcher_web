import React from 'react';
import {CssBaseline} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ToggleDarkMode = (props) => {
    const {toggleTheme, theme} = props;
    const [checked, setChecked] = React.useState(theme === "LIGHT" ? false: true);

    const handleChange = () => {
        toggleTheme();
        Cookies.set("theme", theme === "LIGHT" ? "DARK": "LIGHT");
        (theme === "LIGHT" ? setChecked(true): setChecked(false));
    };

    return (
        <div>
            <CssBaseline />
            <FormControlLabel
                value="bottom"
                control={<Switch
                    color="default"
                    size="medium"
                    onChange={handleChange}
                    value="darkMode"
                    checked={checked} />}
                label="Dark Mode"
                labelPlacement="bottom"
            />
        </div>
    );
};

export default ToggleDarkMode;

ToggleDarkMode.propTypes = {
    toggleTheme: PropTypes.any,
    theme: PropTypes.any,
};
