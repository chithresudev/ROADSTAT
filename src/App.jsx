import { useState, useEffect } from 'react'
import './App.css'
// import React from 'react';
// import { Router, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';
import { SignUpPage } from '@/SignUpPage';
import Sidebar from './Sidebar/sidebar';
import Header from './Header/header';
import Profile from '@/ProfilePage/profile';
import HomePage from '@/HomePage/Home';
import TrackPage from '@/TrackPage/Track';
import TruckUsage from '@/TruckControlPage/Usage';
import TruckEfficiency from '@/TruckControlPage/Efficiency';
import Maintenance from '@/MaintenancePage/Maintenance';
import Driver from '@/DriverPage/Driver';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [headerContent, setHeaderContent] = useState('Home');
  const [activeButtonC, setActiveButtonC] = useState('Home');

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

    const updateHeader = (content) => {
        setHeaderContent(content);
    };

    const updateButton = (buttonname) => {
        setActiveButtonC(buttonname);
    };

  return (

    <Router history={history}>
            <div>
            {currentUser && <Header currentUser={currentUser} logout={logout} headerContent={headerContent}/>}
            {currentUser && <Sidebar isAdmin={isAdmin} logout={logout} activeButtonC={activeButtonC}/>}
                <div className="jumbotrons">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <PrivateRoute path="/" element={<HomePage updateHeader={updateHeader} updateButton={updateButton}/>} />
                                <PrivateRoute path="/admin" element={<AdminPage updateHeader={updateHeader} updateButton={updateButton}/>} roles={[Role.Admin]}/>
                                <PrivateRoute path="/profile" element={<Profile updateHeader={updateHeader} updateButton={updateButton}/>} />
                                <PrivateRoute path="/home" element={<HomePage updateHeader={updateHeader} updateButton={updateButton}/>} />
                                <PrivateRoute path="/track" element={<TrackPage updateHeader={updateHeader} updateButton={updateButton}/>} />
                                <PrivateRoute path="/truckcontrol/usage" element={<TruckUsage updateHeader={updateHeader} updateButton={updateButton}/>} />
                                <PrivateRoute path="/truckcontrol/efficiency" element={<TruckEfficiency updateHeader={updateHeader} updateButton={updateButton}/>} />
                                <PrivateRoute path="/maintenance" element={<Maintenance updateHeader={updateHeader} updateButton={updateButton}/>} />
                                <PrivateRoute path="/driver" element={<Driver updateHeader={updateHeader} updateButton={updateButton}/>} />
                                <Routes>
                                    {/* <Route path="/" element={<HomePage updateHeader={updateHeader} updateButton={updateButton}/> } /> */}
                                    <Route path="/login" element={<LoginPage updateHeader={updateHeader} updateButton={updateButton}/>}/>
                                    <Route path="/signup" element={<SignUpPage updateHeader={updateHeader} updateButton={updateButton}/>}/>
                                    {/* <Route path="/profile" element={<Profile updateHeader={updateHeader} updateButton={updateButton}/>} />
                                    <Route path="/home" element={<HomePage updateHeader={updateHeader} updateButton={updateButton}/>} />
                                    <Route path="/track" element={<TrackPage updateHeader={updateHeader} updateButton={updateButton}/>} />
                                    <Route path="/truckcontrol/usage" element={<TruckUsage updateHeader={updateHeader} updateButton={updateButton}/>} />
                                    <Route path="/truckcontrol/efficiency" element={<TruckEfficiency updateHeader={updateHeader} updateButton={updateButton}/>} />
                                    <Route path="/maintenance" element={<Maintenance updateHeader={updateHeader} updateButton={updateButton}/>} />
                                    <Route path="/driver" element={<Driver updateHeader={updateHeader} updateButton={updateButton}/>} /> */}
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
