import React, { useState, useEffect } from 'react';
import { userService } from '../../../Backend/src/_services';

function AdminPage() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(users => setUsers(users));
    }, []);

    console.log(users);

    return (
        <div>
            <h1>Admin</h1>
            <p>This page can only be accessed by administrators.</p>
            <div>
                All users from secure (admin only) api end point:
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user._id}>{user.username} {user.email} {user.role}</li>
                        )}
                    </ul>
                }
            </div>
        </div>
    );
}

export { AdminPage };
