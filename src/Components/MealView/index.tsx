import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
  onDelete?: (id: string) => void;
}

const OrView = () => <span className="mx-1 text-danger">OR</span>;

const MealView = ({
  id,
  count,
  element,
  alternatives,
  note,
  onDelete,
}: MealViewProps & props) => (
  <li>
    {count + " of " + element + (note ? " (" + note + ")" : "")}

    {onDelete && (
      <FontAwesomeIcon
        icon={faTrash}
        role="button"
        className="mx-1 text-danger"
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
  </li>
);

export default MealView;
