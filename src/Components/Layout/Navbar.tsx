import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../App";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed fixed-top w-100 m-0">
      <div className="container-fluid px-5 py-2">
        <span
          className="navbar-brand"
          role="button"
          onClick={() => navigate("/")}
        >
          PDT
        </span>

        <div>
          <ul className="nav me-auto mb-2 mb-lg-0">
            {routes.map(({ name, path }, x) => (
              <li
                className="nav-item"
                role="button"
                onClick={() => navigate(path)}
                key={x}
              >
                <span
                  className={
                    "nav-link text-decoration-none" +
                    (location.pathname === "/" + path
                      ? " text-secondary"
                      : " text-white")
                  }
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
