import "./App.css";

const Layout = ({ children = <></> }) => {
  return (
    <div className="App">
      <header className="App-header">{children}</header>
    </div>
  );
};

export default Layout;
