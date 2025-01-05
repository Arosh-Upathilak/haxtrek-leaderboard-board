import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { Trophy, Users ,Home  } from 'lucide-react';
import Logo from '../../assets/ces_logo.png';

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar_logo">
        <img src={Logo} alt="Haxtrek Logo" style={{ width: '80px', height: '100px' }} />
      </div>

      <div className="navbar_links">
        <ul>
          <li>
          <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'icon-link nav-active' : 'icon-link'
              }
            >
              <Home size={40} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                isActive ? 'icon-link nav-active' : 'icon-link'
              }
            >
              <Trophy size={40} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/batch"
              className={({ isActive }) =>
                isActive ? 'icon-link nav-active' : 'icon-link'
              }
            >
              <Users size={40} />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;