import NavButton from "../component/navButton";
import NavMobile from "../component/navMobile";
import Head from "next/head";

const Setting = () => {
  return (
    <>
      <Head>
        <title>Setting</title>
      </Head>
      <NavMobile />
      <NavButton />

      <div className="container pt-5">
        <div className="row row-cols-2 pt-5">
          <div className="col py-2">
            <div class="card">
              <div class="card-body text-center">
                <i class="bi bi-journal-text fw-bold fs-1"></i>
                <br />
                Term & Condition
              </div>
            </div>
          </div>
          <div className="col py-2">
            <div class="card">
              <div class="card-body text-center">
                <i class="bi bi-journal-text fw-bold fs-1"></i>
                <br />
                About
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
