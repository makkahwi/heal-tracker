const PageSection = ({ title = "", desc = "", children = <></> }) => {
  return (
    <section className="text-justify my-5 py-5 w-100 px-0 mx-0">
      <h2 className="">{title}</h2>

      <hr className="border border-primary bg-primary py-1 mb-5" />

      <h5 className="text-muted my-4">{desc}</h5>

      <div className="my-4">{children}</div>
    </section>
  );
};

export default PageSection;
