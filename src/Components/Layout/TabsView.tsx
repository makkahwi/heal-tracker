import { Fragment } from "react";

interface props {
  views: { title: string; view: React.ReactNode }[];
}

const TabsView = ({ views }: props) => {
  return (
    <Fragment>
      <div className="btn-group my-3 w-100">
        {views.map(({ title }, i) => (
          <button
            className={"btn btn-" + (i % 2 === 0 ? "primary" : "secondary")}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#" + title.toLowerCase().replaceAll(" ", "")}
            aria-expanded="false"
            aria-controls={title.toLowerCase().replaceAll(" ", "")}
            key={i}
          >
            {title}
          </button>
        ))}
      </div>

      {views.map(({ title, view }, i) => (
        <div
          className="collapse multi-collapse"
          id={title.toLowerCase().replaceAll(" ", "")}
          key={i}
        >
          {view}
        </div>
      ))}
    </Fragment>
  );
};

export default TabsView;
