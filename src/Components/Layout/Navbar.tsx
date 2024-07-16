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
            {routes.map(({ name, path, icon, list }, x) => (
              <li className="nav-item" role="button" key={x}>
                {list ? (
                  <div className="text-white my-2 mx-3 dropdown">
                    <span data-bs-toggle="dropdown" aria-expanded="false">
                      <FontAwesomeIcon icon={icon} />
                      <span className="ms-2 d-none d-lg-inline">{name}</span>
                    </span>

                    <ul className="dropdown-menu">
                      {list.map(({ name, path, icon }, y) => (
                        <li key={y}>
                          <a
                            className="dropdown-item"
                            onClick={() => navigate(path)}
                          >
                            <FontAwesomeIcon icon={icon} />
                            <span className="ms-2">{name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <span
                    className={
                      "nav-link text-decoration-none" +
                      (location.pathname === "/" + path
                        ? " text-info"
                        : " text-white")
                    }
                    onClick={() => navigate(path)}
                  >
                    <FontAwesomeIcon icon={icon} />
                    <span className="ms-2 d-none d-lg-inline">{name}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
