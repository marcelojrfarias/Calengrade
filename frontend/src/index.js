import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';

const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
}

TagManager.initialize({
    gtmId: 'GTM-TJWJPVT'
});

ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>,
document.getElementById('root'));
