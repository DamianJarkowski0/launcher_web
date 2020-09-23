import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore, {history} from './configurations/configureStore';
import {I18nextProvider} from 'react-i18next';
import i18n from './configurations/i18n';
import App from 'containers/App';

const store = configureStore();

const MOUNT_NODE = document.getElementById('app');

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <App history={history}/>
            </I18nextProvider>
        </Provider>,
        MOUNT_NODE
    );
};

if (module.hot) {
    module.hot.accept(['containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
    });
}

render();
