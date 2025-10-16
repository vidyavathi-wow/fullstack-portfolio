import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Todo List', path: '/todos' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>TodoApp</h1>
      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
