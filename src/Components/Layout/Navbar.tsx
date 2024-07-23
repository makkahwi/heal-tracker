import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { routes } from "../../App";
import { signOut } from "../../Store/authSlice";
import { AppDispatch, RootState } from "../../Store/store";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

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
          {user ? (
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
                              className={
                                "dropdown-item " +
                                (location.pathname === "/" + path
                                  ? "active"
                                  : "")
                              }
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
                        "nav-link text-decoration-none " +
                        (location.pathname === "/" + path
                          ? "text-info"
                          : "text-white")
                      }
                      onClick={() => navigate(path)}
                    >
                      <FontAwesomeIcon icon={icon} />
                      <span className="ms-2 d-none d-lg-inline">{name}</span>
                    </span>
                  )}
                </li>
              ))}

              <li className="nav-item" role="button">
                <span
                  className="nav-link text-decoration-none text-white"
                  onClick={() => {
                    dispatch(signOut());
                    navigate(0);
                  }}
                >
                  <FontAwesomeIcon icon={faSignOut} />
                  <span className="ms-2 d-none d-lg-inline">Sign Out</span>
                </span>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
