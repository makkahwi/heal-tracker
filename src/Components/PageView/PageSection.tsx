const PageSection = ({ children = <></>, title = "" }) => {
  return (
    <section className="my-5">
      <h3 className="mb-4 text-start">{title}</h3>

      {children}
    </section>
  );
};

export default PageSection;
