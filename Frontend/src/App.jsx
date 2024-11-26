import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { history, Role } from "../../Backend/src/_helpers";
import { useAuth } from "./context/authContext";
import PrivateRoute from "./_components/PrivateRoute";
import AdminPage from "./AdminPage/AdminPage";
import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import VerifyPage from "./SignUpPage/VerifyPage";
import Sidebar from "./Sidebar/sidebar";
import Header from "./Header/header";
import Profile from "./ProfilePage/profile";
import HomePage from "./HomePage/Home";
import TrackPage from "./TrackPage/Track";
import EfficiencyPage from "./TruckControlPage/Efficiency";
import MaintenancePage from "./MaintenancePage/Maintenance";
import DriverPage from "./DriverPage/Driver";
import UsagePage from "./TruckControlPage/Usage";

function App() {
  const { user, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [headerContent, setHeaderContent] = useState("Home");
  const [activeButtonC, setActiveButtonC] = useState("Home");

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === Role.Admin);
    }
  }, [user]);

  const updateHeader = (content) => {
    setHeaderContent(content);
  };

  const updateButton = (buttonname) => {
    setActiveButtonC(buttonname);
  };

  return (
    // <Router history={history}>
    <div>
      {user && (
        <Header
          currentUser={user}
          logout={logout}
          headerContent={headerContent}
          activeButtonC={activeButtonC}
        />
      )}
      {user && (
        <Sidebar
          isAdmin={isAdmin}
          logout={logout}
          activeButtonC={activeButtonC}
        />
      )}
      <div className="jumbotrons">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute
                      element={HomePage}
                      updateHeader={updateHeader}
                      updateButton={updateButton}
                    />
                  }
                />
                <Route
                  path="/home"
                  element={
                    <PrivateRoute
                      element={HomePage}
                      updateHeader={updateHeader}
                      updateButton={updateButton}
                    />
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute
                      element={AdminPage}
                      roles={[Role.Admin]}
                      updateHeader={updateHeader}
                      updateButton={updateButton}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute
                      element={Profile}
                      updateHeader={updateHeader}
                      updateButton={updateButton}
                    />
                  }
                />
                <Route
                  path="/track"
                  element={
                    <PrivateRoute
                      element={TrackPage}
                      updateHeader={updateHeader}
                      updateButton={updateButton}
                    />
                  }
                />
                <Route
                  path="/truckcontrol/usage"
                  element={
                    <PrivateRoute
                      element={UsagePage}
                      updateHeader={updateHeader}
                      updateButton={updateButton}
                    />
                  }
                />
                <Route
                  path="/truckcontrol/efficiency"
                  element={
                    <PrivateRoute
                      element={EfficiencyPage}
                      updateHeader={updateHeader}
                      updateButton={updateButton}
                    />
                  }
                />
                <Route
                  path="/maintenance"
                  element={
                    <PrivateRoute
                      element={MaintenancePage}
                      updateHeader={updateHeader}
                      updateButton={updateButton}
                    />
                  }
                />
                <Route
                  path="/driver"
                  element={
                    <PrivateRoute
                      element={DriverPage}
                      updateHeader={updateHeader}
                      updateButton={updateButton}
                    />
                  }
                />
                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Router>
  );
}

export default App;
