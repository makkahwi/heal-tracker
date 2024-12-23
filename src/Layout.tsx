import { Toast } from "bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./Components/Layout/Footer";
import Navbar from "./Components/Layout/Navbar";
import ScrollToTop from "./Components/Layout/ScrollToTop";
import { removeNotifications } from "./Store/notifications";
import { RootState } from "./Store/store";

import "../node_modules/react-vis/dist/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

const Layout = ({ children = <></> }) => {
  const dispatch = useDispatch();

  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    const toastElements = document.querySelectorAll(".toast");
    toastElements.forEach((toastEl) => {
      const toast = new Toast(toastEl); // Use the imported Toast class
      toast.show();

      toastEl.addEventListener("hidden.bs.toast", () => {
        const message = toastEl.querySelector(".toast-body")?.textContent;
        if (message) {
          dispatch(removeNotifications({ msg: message }));
        }
      });
    });

    return () => {
      toastElements.forEach((toastEl) => {
        toastEl.removeEventListener("hidden.bs.toast", () => {});
      });
    };
  }, [notifications, dispatch]);

  return (
    <main className="bg-light min-vh-100 text-dark text-center p-md-5 p-2">
      <ScrollToTop />

      <Navbar />

      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 1055 }}
      >
        {notifications.map(({ msg, err }, i) => (
          <div
            key={i}
            className={`toast align-items-center text-white bg-${
              err ? "danger" : "success"
            } border-0`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{msg}</div>

              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-md-5 p-2 pt-5">{children}</div>

      <Footer />
    </main>
  );
};

export default Layout;
