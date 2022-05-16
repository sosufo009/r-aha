import { Link } from 'react-router-dom';

function NavBar(): JSX.Element {
  return (
    <nav className="text-white absolute top-2">
      <Link to="/">Home</Link>
      {' '}
      |
      {' '}
      <Link to="/password">Password</Link>
      {' '}
      |
      {' '}
      <Link to="/calendar">Calendar</Link>
    </nav>
  );
}

export default NavBar;
