const PageSection = ({ title = "", desc = "", children = <></> }) => {
  return (
    <section className="text-justify my-5 py-5">
      <h2 className="mb-5">{title}</h2>

      <h5 className="text-muted my-4">{desc}</h5>

      <div className="my-4">{children}</div>
    </section>
  );
};

export default PageSection;
