import {
  faDashboard,
  faInfoCircle,
  faSignIn,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const { loading } = useSelector((state: RootState) => state.loading);

  const closeDropdowns = () => {
    const dropdowns = document.querySelectorAll(".dropdown-menu.show");
    dropdowns.forEach((dropdown) => dropdown.classList.remove("show"));

    const toggler = document.querySelector(".navbar-collapse");
    if (toggler) toggler.classList.remove("show");
  };

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

          {!!loading.length ? (
            <span
              className="spinner-grow text-light spinner-border-sm ms-3"
              aria-hidden="true"
            />
          ) : (
            ""
          )}
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
                    onClick={() => {
                      navigate("/");
                      closeDropdowns();
                    }}
                  >
                    <FontAwesomeIcon icon={faDashboard} />
                    <span className="ms-2">{t("Layout.Dashboard")}</span>
                  </span>
                </li>

                {routes.map(({ name, path, icon, list }, i) => (
                  <li className="nav-item dropdown" key={i}>
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
                        id={`navbarDropdown-${i}`}
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
                        onClick={() => {
                          navigate(path);
                          closeDropdowns();
                        }}
                      >
                        <FontAwesomeIcon icon={icon} />
                        <span className="ms-2">{name}</span>
                      </span>
                    )}

                    {list && (
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`navbarDropdown-${i}`}
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
                                  closeDropdowns();
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
                    onClick={() => {
                      navigate("manual");
                      closeDropdowns();
                    }}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span className="ms-2 d-inline d-xl-none">
                      {t("Layout.App Manual")}
                    </span>
                  </span>
                </li>

                <li className="nav-item">
                  <span
                    className="nav-link text-white"
                    role="button"
                    onClick={() => {
                      dispatch(signOut());
                      closeDropdowns();
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                    <span className="ms-2 d-inline d-xl-none">
                      {t("Layout.Sign Out")}
                    </span>
                  </span>
                </li>
              </Fragment>
            ) : (
              <li className="nav-item">
                <span
                  className="nav-link text-white"
                  role="button"
                  onClick={() => {
                    navigate("/login");
                    closeDropdowns();
                  }}
                >
                  <FontAwesomeIcon icon={faSignIn} />
                  <span className="ms-2">{t("Layout.SignIn/Register")}</span>
                </span>
              </li>
            )}

            {/* <li className="nav-item">
              <span
                className="nav-link text-white"
                role="button"
                onClick={() => {
                  const lang = i18n.language === "ar" ? "en" : "ar";

                  localStorage.setItem("lang", lang);
                  i18n.changeLanguage(lang);
                  
                  closeDropdowns();
                }}
              >
                <FontAwesomeIcon icon={faLanguage} />
                <span className="ms-2">{t("OtherLang")}</span>
              </span>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
