import {
  faArrowDown,
  faArrowUp,
  faCheck,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react/jsx-runtime";

export interface MealViewProps {
  id?: string;
  meal?: string;
  note?: string;
  count: string;
  unit: string;
  element: string;
  alternatives?: MealViewProps[];
}

interface props {
  dark?: boolean;
  onDelete?: (id: string) => void;
  supposed?: MealViewProps;
  compare?: boolean;
}

const OrView = () => (
  <span className="mx-1 text-danger">
    <br />
    OR
  </span>
);

const MealView = ({
  id,
  count,
  unit,
  element,
  alternatives,
  note,
  onDelete,
  supposed,
  compare,
  dark,
}: MealViewProps & props) => {
  const Element = ({ children }: { children: any }) => {
    let elementMatch = false;
    let countMatch = false;

    let countIcon = faMinus;

    if (element === supposed?.element) {
      elementMatch = element === supposed?.element;
      countMatch = count === supposed?.count;
      countIcon = count > supposed?.count ? faArrowUp : faArrowDown;
    } else {
      elementMatch = !!supposed?.alternatives?.find(
        (a) => a.element === element
      )?.element;
      countMatch =
        count ===
        supposed?.alternatives?.find((a) => a.element === element)?.count;
      countIcon =
        count >
        (supposed?.alternatives?.find((a) => a.element === element)?.count || 0)
          ? faArrowUp
          : faArrowDown;
    }

    const match = countMatch && elementMatch;

    return compare ? (
      <div className={match ? "text-success" : "text-danger"}>
        <FontAwesomeIcon
          icon={match ? faCheck : elementMatch ? countIcon : faPlus}
          className="me-1"
        />

        <span
          className={
            countMatch ? "text-decoration-none" : "text-decoration-underline"
          }
        >
          {count} {unit}
        </span>
        <span
          className={
            elementMatch ? "text-decoration-none" : "text-decoration-underline"
          }
        >
          {" of "}
        </span>
        <span
          className={
            elementMatch ? "text-decoration-none" : "text-decoration-underline"
          }
        >
          {element}
        </span>
        {note ? " (" + note + ")" : ""}
        {children}
      </div>
    ) : (
      <li
        className={
          "text-start " + (dark && onDelete ? "bg-light p-2" : " py-1 px-2")
        }
      >
        {count +
          " " +
          unit +
          " " +
          " of " +
          element +
          (note ? " (" + note + ")" : "")}

        {children}
      </li>
    );
  };

  return (
    <Element>
      {onDelete && (
        <FontAwesomeIcon
          icon={faTrash}
          role="button"
          className="mx-1 me-5 text-danger"
          onClick={() => onDelete(id || "")}
        />
      )}

      {alternatives ? (
        <Fragment>
          <OrView />
          {alternatives.map((alternative, i) => (
            <Fragment key={i}>
              {alternative.count +
                " " +
                alternative.unit +
                " of " +
                alternative.element}
              {i !== alternatives.length - 1 ? <OrView /> : ""}
            </Fragment>
          ))}
        </Fragment>
      ) : (
        ""
      )}
    </Element>
  );
};

export default MealView;
