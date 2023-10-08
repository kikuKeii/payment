/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
const NavMobile = () => {
  return (
    <>
      <div className="container fixed-top d-block d-md-none">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom fw-bold bg-white bg-opacity-75">
          <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <i className="bi bi-credit-card-2-back fs-2 pe-2"></i>
            <span className="fs-4"> Payment</span>
          </div>
        </header>
      </div>
    </>
  );
};

export default NavMobile;
