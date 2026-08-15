import { Link } from "react-router-dom";

function Navbar({ brandName }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        {brandName}
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Notes">
              Notes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tasks">
              Tasks
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
