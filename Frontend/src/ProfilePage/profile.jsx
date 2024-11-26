import React, { useState, useEffect } from "react";
//import { userService, authenticationService } from "@/_services";
import "./profile.css";

function Profile({ updateHeader, updateButton }) {
  const [currentUser, setCurrentUser] = useState(
    authenticationService.currentUserValue
  );
  const [userFromApi, setUserFromApi] = useState(null);

  useEffect(() => {
    updateHeader("Profile");
    updateButton("Profile");
  }, [updateHeader, updateButton]);

  useEffect(() => {
    const fetchUserFromApi = async () => {
      try {
        const user = await userService.getById(currentUser.id);
        setUserFromApi(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserFromApi();

    return () => {};
  }, [currentUser.id]);

  console.log(currentUser);
  console.log(userFromApi);

  return (
    <div className="mainprofile">
      <div className="content">
        <div className="access">
          <p>You're logged in with React & JWT!!</p>
          <p>
            Your role is: <strong>{currentUser.role}</strong>.
          </p>
          <p>This page can be accessed by all authenticated users.</p>
          <div>
            Current user from secure API endpoint:
            {userFromApi && (
              <ul>
                <li>
                  {userFromApi.username} {userFromApi.email} {userFromApi.role}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
