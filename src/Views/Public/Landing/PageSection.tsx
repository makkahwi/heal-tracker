const PageSection = ({ title = "", desc = "", children = <></> }) => {
  return (
    <section className="my-5 py-5 w-100 px-0 mx-0">
      <h2 className="text-start text-primary fw-bold">{title}</h2>

      <div className="bg-primary py-1 mt-3 mb-5 w-100" />

      <h5 className="text-justify text-muted my-4 lh-lg">{desc}</h5>

      <div className="my-4">{children}</div>
    </section>
  );
};

export default PageSection;
