import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const Layout = ({ children = <></> }) => {
  return (
    <main>
      <div className="bg-dark min-vh-100 text-white text-center p-5">
        {children}
      </div>
    </main>
  );
};

export default Layout;
