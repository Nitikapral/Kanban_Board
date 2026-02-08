import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold d-flex align-items-center">
          <i className="bi bi-kanban me-2 text-primary fs-4"></i>
          Kanban Board
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${isActive ? "fw-semibold text-primary" : "text-secondary"
                  }`
                }
              >
                <i className="bi bi-columns-gap me-1"></i>
                Board
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/tree"
                className={({ isActive }):string=>
                  `nav-link d-flex align-items-center ${isActive ? "fw-semibold text-primary" : "text-secondary"
                  }`
                }
              >
                <i className="bi bi-diagram-3 me-1"></i>
                Tree
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
