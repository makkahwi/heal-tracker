import { Fragment } from "react/jsx-runtime";
import PageSection from "../../Components/PageSection";
import { routes } from "../../App";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <PageSection title="Welcome To `Personal Diet Tracker`">
      <Fragment>
        <h4 className="mt-5 my-2">Pick of Following...</h4>

        <div className="btn-group my-4">
          {routes.map(({ name, path }, x) => (
            <button
              className="btn btn-secondary"
              onClick={() => navigate(path)}
              key={x}
            >
              {name}
            </button>
          ))}
        </div>
      </Fragment>
    </PageSection>
  );
};

export default Welcome;
