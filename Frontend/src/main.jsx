import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
// import { history } from '../../Backend/src/_helpers';
import { AuthProvider } from './context/authContext';


// import { configureFakeBackend } from '../../Backend/src/_helpers/index.js';

// configureFakeBackend();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
{/*       <BrowserRouter history={history}> */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>  
  </React.StrictMode>,
)
