import LoginStatus from "./auth/LoginStatus";

const NavBar = () => {
  return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary">4</span>
      <LoginStatus />
    </nav>
  );
};

export default NavBar;
