import React, { useState, useEffect } from 'react';
import { userService, authenticationService } from '@/_services';
import './HomePage.css'

function HomePage() {
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);
    const [userFromApi, setUserFromApi] = useState(null);

    useEffect(() => {
        const fetchUserFromApi = async () => {
            try {
                const user = await userService.getById(currentUser.id);
                setUserFromApi(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUserFromApi();

        // Clean-up function
        return () => {
            // Perform any clean-up here if needed
        };
    }, [currentUser.id]); // Dependency array ensures useEffect runs when currentUser.id changes

    return (
        <div>
            <header className="header">
                <h1>Home</h1>
            </header>
            <div className="content">
                <div className='access'>
                    <p>You're logged in with React & JWT!!</p>
                    <p>Your role is: <strong>{currentUser.role}</strong>.</p>
                    <p>This page can be accessed by all authenticated users.</p>
                    <div>
                        Current user from secure API endpoint:
                        {userFromApi &&
                            <ul>
                                <li>{userFromApi.firstName} {userFromApi.lastName}</li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export { HomePage };
