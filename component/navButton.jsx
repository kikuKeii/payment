const NavButton = () => {
  return (
    <>
      <nav className="navbar bg-primary color-white fs-5 fw-bold navbar-expand fixed-bottom d-block d-md-none">
        <ul className=" navbar-nav nav-justified w-100">
          <li className="nav-item">
            <a href="./payment" className="nav-link">
              <i className="bi bi-house-door-fill fs-4 fw-bold text-white"></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="./payment/setting" className="nav-link">
              <i className="bi bi-info-square-fill fs-4 fw-bold text-white"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavButton;
