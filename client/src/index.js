import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ContextProvider } from './Context';
import Recorder from './Recorder';

import './styles.css';

ReactDOM.render(
  <ContextProvider>
    <Recorder />
    <App />
  </ContextProvider>,
  document.getElementById('root'),
);
