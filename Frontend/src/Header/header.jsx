/* eslint-disable react/prop-types */
import { useState, useEffect  } from 'react';
import '../Header/header.css';
import { Link, useLocation} from 'react-router-dom';


function Header({ currentUser, logout, headerContent}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPath, setCurrentPath] = useState('/');
    const location = useLocation();

    useEffect(() => {
        if (currentPath !== '/') {
            window.location.href = currentPath;
        }
    }, [currentPath]);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        console.log(query)
        if (query === '') {
            setCurrentPath('/home');
        } else if (query === 'track') {
            setCurrentPath('/track');
        }
        else if (query === 'driver') {
            setCurrentPath('/driver');
        }
        else if (query === 'efficiency') {
            setCurrentPath('/efficiency');
        }
        else if (query === 'usage') {
            setCurrentPath('/usage');
        }
        else if (query === 'brake') {
            setCurrentPath('/maintenance');
        }
        else if (query.startsWith('trk')) {
                const currentPath = location.pathname;
                const url = `${currentPath}?truckNo=${query.toUpperCase()}`;
                window.location.href = url;
        }
        else if (query.startsWith('dr')) {
            const currentPath = location.pathname;
            const url = `${currentPath}?driverId=${query.toUpperCase()}`;
            window.location.href = url;
    }
    };
   

    return (
        <header className="header">
            <h1>{headerContent}</h1>
            <div className='header-content'>
                <div className="searchb">
                    <input type="text" className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <Link onClick={handleSearch}>
                        <span className="search-icon">
                            <img src="/images/search.png" alt="Search Icon" />
                        </span>
                    </Link>
                </div>
                <div className="user-profile">
                    <span>{currentUser.username}</span>
                    <Link to="/profile"><img src="/images/profile.png" alt="Profile Icon" className="profile"/></Link>
                </div>
                <div>
                    <button className='lbutton' onClick={logout}>
                        <Link><img src="/images/logout.png" alt="Logout Icon" className="logout"/></Link>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
