import {
  faCheckCircle,
  faTrash,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react/jsx-runtime";

export interface MealViewProps {
  id?: string;
  meal?: string;
  note?: string;
  count: string;
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
  element,
  alternatives,
  note,
  onDelete,
  supposed,
  compare,
  dark,
}: MealViewProps & props) => {
  const Element = ({ children }: { children: any }) => {
    const countMatch = count === supposed?.count;
    const elementMatch = element === supposed?.element;

    const match = countMatch && elementMatch;

    return compare ? (
      <div className={match ? "text-success" : "text-danger"}>
        <FontAwesomeIcon
          icon={match ? faCheckCircle : faXmarkCircle}
          className="me-1"
        />
        <span
          className={
            countMatch ? "text-decoration-none" : "text-decoration-underline"
          }
        >
          {count}
        </span>

        {" of "}

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
        {count + " of " + element + (note ? " (" + note + ")" : "")}

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
              {alternative.count + " of " + alternative.element}
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
