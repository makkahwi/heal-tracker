import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const Layout = ({ children = <></> }) => {
  return (
    <main>
      <body className="bg-dark min-vh-100 text-white text-center p-5">
        {children}
      </body>
    </main>
  );
};

export default Layout;
