import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";

import { routes } from "../../App";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-primary position-fixed fixed-top w-100 m-0">
      <div className="container-fluid px-5 py-1">
        <span
          className="navbar-brand text-white fw-bold"
          role="button"
          onClick={() => navigate("/")}
        >
          PDT
        </span>

        <div>
          <ul className="nav me-auto mb-2 mb-lg-0">
            {routes.map(({ name, path, icon }, x) => (
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
                      ? " text-info"
                      : " text-white")
                  }
                >
                  <FontAwesomeIcon icon={icon} />
                  <span className="ms-2 d-none d-lg-inline">{name}</span>
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
