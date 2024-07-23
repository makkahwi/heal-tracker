import { Fragment } from "react";

import Form, { inputProps } from "../../Components/Form";
import PageSection from "./PageSection";
import PageTable from "./Table";

export interface props {
  title: string;
  data: { id?: string }[];
  inputs: inputProps[];
  onSubmit: (x: any) => void;
  onDelete: Function;
}

const PageView = ({ title, data, inputs, onSubmit, onDelete }: props) => {
  return (
    <PageSection title={title}>
      <Fragment>
        <Form inputs={inputs} onSubmit={onSubmit} />

        <PageTable data={data} inputs={inputs} onDelete={onDelete} />
      </Fragment>
    </PageSection>
  );
};

export default PageView;
