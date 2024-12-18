import {
  faDashboard,
  faInfoCircle,
  faSignIn,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import { routes } from "../../App";
import { signOut } from "../../Store/authSlice";
import { AppDispatch, RootState } from "../../Store/store";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="navbar navbar-expand-xl navbar-primary bg-primary shadow-sm position-fixed fixed-top w-100">
      <div className="container-fluid px-4 py-2">
        <span
          role="button"
          className="navbar-brand d-flex align-items-center"
          onClick={() => navigate("/")}
        >
          <img
            src={"/Logo-Only-White.png"}
            alt="Logo"
            height={40}
            className="me-2"
          />
          <span className="text-white fw-bold">HDL</span>
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="navbarContent" className="collapse navbar-collapse text-start">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <span
                    className={`nav-link ${
                      location.pathname === "/" ? "text-dark" : "text-white"
                    }`}
                    role="button"
                    onClick={() => navigate("/")}
                  >
                    <FontAwesomeIcon icon={faDashboard} />
                    <span className="ms-2">Dashboard</span>
                  </span>
                </li>

                {routes.map(({ name, path, icon, list }, index) => (
                  <li className="nav-item dropdown" key={index}>
                    {list ? (
                      <span
                        className={`nav-link dropdown-toggle ${
                          list
                            .map(({ path }) => path)
                            .find((childPath) =>
                              location.pathname.includes(
                                "/" + path + "/" + childPath
                              )
                            )
                            ? "text-dark"
                            : "text-white"
                        }`}
                        id={`navbarDropdown-${index}`}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon icon={icon} />
                        <span className="ms-2">{name}</span>
                      </span>
                    ) : (
                      <span
                        className={`nav-link ${
                          location.pathname === "/" + path
                            ? "text-dark"
                            : "text-white"
                        }`}
                        role="button"
                        onClick={() => navigate(path)}
                      >
                        <FontAwesomeIcon icon={icon} />
                        <span className="ms-2">{name}</span>
                      </span>
                    )}

                    {list && (
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`navbarDropdown-${index}`}
                      >
                        {list.map(
                          ({ name, path: childPath, icon }, subIndex) => (
                            <li key={subIndex}>
                              <span
                                className={`dropdown-item ${
                                  location.pathname ===
                                  "/" + path + "/" + childPath
                                    ? "active"
                                    : ""
                                }`}
                                role="button"
                                onClick={() => {
                                  navigate(path + "/" + childPath);

                                  document
                                    .querySelector(".dropdown-menu")
                                    ?.classList.remove("show");
                                }}
                              >
                                <FontAwesomeIcon icon={icon} />
                                <span className="ms-2">{name}</span>
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </>
            )}
          </ul>

          <ul className="navbar-nav">
            {user ? (
              <Fragment>
                <li className="nav-item">
                  <span
                    className={`nav-link ${
                      location.pathname === "/manual"
                        ? "text-dark"
                        : "text-white"
                    }`}
                    role="button"
                    onClick={() => navigate("manual")}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span className="ms-2">App Manual</span>
                  </span>
                </li>

                <li className="nav-item">
                  <span
                    className="nav-link text-white"
                    role="button"
                    onClick={() => {
                      dispatch(signOut());
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                    <span className="ms-2">Sign Out</span>
                  </span>
                </li>
              </Fragment>
            ) : (
              <li className="nav-item">
                <span
                  className="nav-link text-white"
                  role="button"
                  onClick={() => navigate("/login")}
                >
                  <FontAwesomeIcon icon={faSignIn} />
                  <span className="ms-2">Sign In / Register</span>
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
