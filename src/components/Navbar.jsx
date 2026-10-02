import { Link, useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  removeCurrentUser
} from "../utils/localStorage";

function Navbar() {

  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  function handleLogout() {
    removeCurrentUser();

    navigate("/login");
  }

  return (
    <nav className="navbar navbar-dark px-4">

      <div className="container-fluid">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          DevSpace
        </Link>


        {currentUser && (

          <div className="d-flex align-items-center gap-4">

            <Link
              className="nav-link"
              to="/"
            >
              Dashboard
            </Link>

            <Link
              className="nav-link"
              to="/projects"
            >
              Projects
            </Link>

            <span className="text-light">
              Hi, {currentUser.name}
            </span>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;