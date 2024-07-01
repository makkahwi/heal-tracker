import { useNavigate } from "react-router-dom";
import { routes } from "../../App";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed fixed-top w-100 m-0">
      <div className="container-fluid">
        <span
          className="navbar-brand"
          role="button"
          onClick={() => navigate("/")}
        >
          Personal Diet Tracker
        </span>

        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {routes.map(({ name, path }, x) => (
              <li
                className="nav-item"
                role="button"
                onClick={() => navigate(path)}
                key={x}
              >
                <span className="nav-link active">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
