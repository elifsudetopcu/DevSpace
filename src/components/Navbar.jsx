
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark px-4">
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          DevSpace
        </Link>

        <div className="d-flex align-items-center gap-4">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>

          <Link className="nav-link" to="/projects">
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
