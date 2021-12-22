import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import App from './App';
import * as serviceWorker from './serviceWorker';
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ar from 'javascript-time-ago/locale/ar-AE'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-165375572-1');
ReactGA.pageview(window.location.pathname + window.location.search);
JavascriptTimeAgo.locale(en)
JavascriptTimeAgo.locale(ar)

ReactDOM.render(
     <App />
     

 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
