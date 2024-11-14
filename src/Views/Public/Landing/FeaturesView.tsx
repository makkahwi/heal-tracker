import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageSection from "./PageSection";

const FeaturesView = ({
  title = "",
  desc = "",
  features = [
    {
      icon: faMobileAlt,
      title: "",
      desc: "",
    },
  ],
}) => {
  return (
    <PageSection title={title} desc={desc}>
      <div className="row justify-content-center align-items-stretch">
        {features.map(({ icon, title, desc }, i) => (
          <div key={i} className="col-md-6 col-lg-4 my-3 px-4 d-flex">
            <div className="card h-100 shadow-sm border-0 w-100">
              <div className="card-body text-center d-flex flex-column">
                <FontAwesomeIcon
                  icon={icon}
                  className="text-primary mb-3"
                  size="2x"
                />
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <div className="mt-auto"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default FeaturesView;
