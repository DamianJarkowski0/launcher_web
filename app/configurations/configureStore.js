import {createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createReducer from './reducers';
import ReduxThunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';

export const history = createBrowserHistory();

const configureStore = (preloadedState) => {
    const composeEnhancer = compose;

    const store = createStore(
        createReducer(history),
        preloadedState,
        composeEnhancer(
            composeWithDevTools(
                applyMiddleware(
                    routerMiddleware(history),
                    ReduxThunk,
                ))));

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(history));
        });
    }

    return store;
};

export default configureStore;
