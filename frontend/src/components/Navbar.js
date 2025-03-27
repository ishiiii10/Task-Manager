import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Logo />
        </Link>
        
        <div className="navbar-menu">
          {user ? (
            <>
              <span className="navbar-user">Welcome, {user.name}</span>
              <ThemeToggle />
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link to="/login" className="btn-login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 