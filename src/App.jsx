import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import React from 'react';
// import { Router, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';

function App() {
  // const [count, setCount] = useState(0)

  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const subscription = authenticationService.currentUser.subscribe(user => {
            setCurrentUser(user);
            setIsAdmin(user && user.role === Role.Admin);
        });
        
        return () => subscription.unsubscribe();
    }, []);

    const logout = () => {
        authenticationService.logout();
        history.push('/login');
    };

  return (
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    <Router history={history}>
            <div>
                {currentUser &&
                   <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div className="navbar-nav">
                            <div className='logo'>
                                <p>Company</p>
                            </div>
                            <div>
                                <button ><Link to="/" className="nav-item nav-link">Home</Link></button>
                            </div>
                            <div>
                            {isAdmin && <button><Link to="/admin" className="nav-item nav-link">Admin</Link></button>}
                            </div>
                            <div>
                                <button onClick={logout} className="nav-item nav-link btn-logout">Logout</button>
                            </div>
                        </div>
                    </nav>
                }
                <div className="jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                <Routes>
                                    {/* <Route path="/login" component={LoginPage} /> */}
                                    <Route path="/login" element={<LoginPage />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
  )
}

export default App
