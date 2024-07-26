import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { configureFakeBackend } from '../../Backend/src/_helpers/index.js';

configureFakeBackend();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
