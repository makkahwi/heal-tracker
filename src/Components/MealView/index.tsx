import { Fragment } from "react/jsx-runtime";

export interface MealViewProps {
  meal?: string;
  count: string;
  element: string;
  alternatives?: MealViewProps[];
}

const OrView = () => <span className="mx-1 text-danger">OR</span>;

const MealView = ({ count, element, alternatives }: MealViewProps) => (
  <li>
    {count + " of " + element}
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
