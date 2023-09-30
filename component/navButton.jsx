const NavButton = () => {
  return (
    <>
      <nav className="navbar bg-primary color-white fs-5 fw-bold navbar-expand fixed-bottom d-block d-md-none">
        <ul className=" navbar-nav nav-justified w-100">
          <li className="nav-item">
            <a href="./apli" className="nav-link">
              <i className="bi bi-arrow-clockwise"></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="./setting" className="nav-link">
              <i className="bi bi-gear"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavButton;
