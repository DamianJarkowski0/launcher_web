let DEVMODE = true;

if (CONFIG.ENV !== "PROD") {
    DEVMODE = false;
}

export const info = (message, debug) => {
    if (debug) {
        if (DEVMODE) {
            console.info(message);
        }
    } else {
        console.info(message);
    }
};

export const log = (message, debug) => {
    if (debug) {
        if (DEVMODE) {
            console.log(message);
        }
    } else {
        console.log(message);
    }
};

export const warn = (message, debug) => {
    if (debug) {
        if (DEVMODE) {
            console.warn(message);
        }
    } else {
        console.warn(message);
    }
};

export const error = (message, debug) => {
    if (debug) {
        if (DEVMODE) {
            console.error(message);
        }
    } else {
        console.error(message);
    }
};

export const debug = (message, debug) => {
    if (debug) {
        if (DEVMODE) {
            console.debug(message);
        }
    } else {
        console.debug(message);
    }
};

export const trace = (message, debug) => {
    if (debug) {
        if (DEVMODE) {
            console.trace(message);
        }
    } else {
        console.trace(message);
    }
};
