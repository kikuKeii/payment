"use client";
import { useEffect, useState } from "react";
import snap from "./midtrans";
import "bootstrap/dist/css/bootstrap.css";
import NavDesktop from "@/component/navDesktop";
import NavMobile from "@/component/navMobile";
import NavButton from "@/component/navButton";
import FooterDesktop from "@/component/footerDesktop";
const Home = () => {
  useEffect(() => {
    //d
  }, []);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [snapToken, setSnapToken] = useState("");

  const handeSubmitEmail = () => {
    if (validateEmail(email)) {
      setValidEmail("");
      console.log("Valid email address.");
    } else {
      setValidEmail("Invalid email address.");
      console.log("Invalid email address.");
    }
  };

  function validateEmail(email) {
    // Regular expression pattern for a valid email address
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Test the provided email against the pattern
    return emailPattern.test(email);
  }

  const getSnapToken = () => {
    const transactionDetails = {
      order_id: "12345",
      gross_amount: 100000, // Total pembayaran dalam rupiah
    };
    snap
      .createTransaction(transactionDetails)
      .then((transactionToken) => {
        snap.pay(transactionToken, {
          onSuccess: function (result) {
            console.log("Pembayaran sukses!", result);
            // Tindakan setelah pembayaran sukses
          },
          onPending: function (result) {
            console.log("Pembayaran tertunda.", result);
            // Tindakan saat pembayaran tertunda
          },
          onError: function (result) {
            console.error("Pembayaran gagal!", result);
            // Tindakan jika pembayaran gagal
          },
        });
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat membuat transaksi Snap:", error);
      });
  };
  const showSnap = () => {
    // window.snap.pay("248f54fc-95b1-4d88-ab3c-777acff28b59");
  };
  return (
    <>
      <NavDesktop />
      <NavMobile />
      <NavButton />
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">image</div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Create Payment
            </h1>
            <div className="text-danger">{validEmail}</div>
            <div className="form-floating my-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                onClick={(e) => handeSubmitEmail()}
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2"
              >
                Submit
              </button>
              <script
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key="SB-Mid-client-86Hg0Nfnjaavt03r"
                async
              ></script>
              <button onClick={(e) => getSnapToken()}>Pay!</button>
            </div>
          </div>
        </div>
      </div>

      <FooterDesktop />
    </>
  );
};

export default Home;
