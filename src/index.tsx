import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "./index.scss";
import App from "./components/Table/Table";

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
