import { Collapse } from "bootstrap";
import { Fragment, useEffect } from "react";

interface props {
  views: { title: string; view: React.ReactNode }[];
}

const TabsView = ({ views }: props) => {
  useEffect(() => {
    views.forEach(({ title }) => {
      const collapseElement = document.getElementById(
        title.toLowerCase().replaceAll(" ", "")
      );
      if (collapseElement) {
        new Collapse(collapseElement, { toggle: false });
      }
    });
  }, [views]);

  const handleToggle = (targetId: string) => {
    const collapseElement = document.getElementById(targetId);
    if (collapseElement) {
      const bsCollapse = Collapse.getInstance(collapseElement);
      if (bsCollapse) {
        bsCollapse.toggle();
      }
    }
  };

  return (
    <Fragment>
      <div className="btn-group my-3 w-100">
        {views.map(({ title }, i) => (
          <button
            className={"btn btn-" + (i % 2 === 0 ? "primary" : "secondary")}
            type="button"
            onClick={() =>
              handleToggle(title.toLowerCase().replaceAll(" ", ""))
            }
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
