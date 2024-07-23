const PageSection = ({ children = <></>, title = "" }) => {
  return (
    <section className="my-5">
      <h4 className="mb-4">{title}</h4>

      {children}
    </section>
  );
};

export default PageSection;
