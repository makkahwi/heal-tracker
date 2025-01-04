import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const contacts = [
    {
      icon: "fas fa-globe",
      link: "https://suhaib.dev/",
      tooltip: "Own Website",
      key: "website",
    },
    {
      icon: "fab fa-linkedin",
      link: "https://linkedin.com/in/makkahwi/",
      tooltip: "Makkahwi @ Linkedin",
      key: "linkedin",
    },
    {
      icon: "fab fa-facebook",
      link: "https://facebook.com/makkahwi",
      tooltip: "Makkahwi @ Facebook",
      key: "facebook",
    },
    {
      icon: "fab fa-instagram",
      link: "https://instagram.com/makkahwi",
      tooltip: "Makkahwi @ Instagram",
      key: "instagram",
    },
    {
      icon: "fab fa-whatsapp",
      link: "https://wasap.my/962788424973",
      tooltip: "+962788424973 @ Whatsapp",
      key: "whatsapp",
    },
    {
      icon: "fab fa-telegram",
      link: "https://t.me/makkahwi",
      tooltip: "+962788424973 @ Telegram",
      key: "telegram",
    },
    {
      icon: "fas fa-envelope",
      link: "mailto:SuhaibAhmadAi@hotmail.com",
      tooltip: "Professional Email",
      key: "email",
    },
    {
      icon: "fas fa-phone",
      link: "tel:+962788424973",
      tooltip: "+962788424973",
      key: "phone",
    },
  ];

  return (
    <footer className="footer">
      <div className="bg-light py-4 py-md-5 py-xl-8 border-top border-light-subtle">
        <div className="container overflow-hidden">
          <div className="row gy-4 gy-md-0 align-items-md-center">
            <div className="col-xs-12 col-md-7 order-1 order-md-0">
              <h6 className="copyright text-center text-md-start">
                <img src="/Logo-Only.png" alt="logo" height={100} />
                {t("Layout.AppFullName")}
              </h6>
            </div>

            <div className="col-xs-12 col-md-7 order-1 order-md-0">
              <div className="copyright text-center text-md-start">
                {t("Layout.ReservedRights")}{" "}
                <a
                  href="https://suhaib.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-dark"
                >
                  {t("Layout.Suhaib")}
                </a>{" "}
                &copy; {new Date().getFullYear()}
              </div>
            </div>

            <div className="col-xs-12 col-md-5 order-0 order-md-1">
              <div className="social-media-wrapper">
                <ul className="list-unstyled m-0 p-0 d-flex justify-content-center justify-content-md-end">
                  {contacts.map(({ tooltip, icon, link }, x) => (
                    <li className="me-3" key={x}>
                      <a
                        href={link}
                        className="link-dark link-opacity-75-hover"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className={icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
