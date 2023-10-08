"use client";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useState, useEffect } from "react";
import FooterDesktop from "../component/footerDesktop";
import NavButton from "../component/navButton";
import NavDesktop from "../component/navDesktop";
import NavMobile from "../component/navMobile";
import Head from "next/head";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
require("dotenv").config();

const axios = require("axios");
var prod = false;
const linkMid = "https://app.sandbox.midtrans.com/snap/snap.js";
const baseUrl = "https://payment-kiki.vercel.app";
var clientKey = process.env.CLIENT_KEY;
if (process.env.IS_PRODUCTION == "production") {
  prod = true;
  linkMid = "https://app.midtrans.com/snap/snap.js";
}
const Home = () => {
  const router = useRouter();

  const [snapToken, setSnapToken] = useState();
  const [idOrder, setIdOrder] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState(10000);
  const { order_id } = router.query;

  useEffect(() => {
    handleSatatus();
  }, [order_id]);

  const handleSatatus = () => {
    if (order_id) {
      setIdOrder(order_id);
      const sendData = {
        order_id: order_id,
      };
      const url = baseUrl + "/api/midtrans/get-status";
      axios
        .post(url, sendData)
        .then((response) => {
          // console.log("Status:", response.data.status);
          document.getElementById("start").classList.add("d-none");
          document.getElementById("hero").classList.add("d-none");
          document.getElementById("payment").classList.remove("d-none");
        })
        .catch((error) => {
          console.error("Tanggapan error:", error);
        });
      const storedDataString = localStorage.getItem("dataLocal");
      if (storedDataString) {
        const storedData = JSON.parse(storedDataString);
        if (storedData.expirationTime > new Date().getTime()) {
          setSnapToken(storedData.snapToken);
          setName(storedData.name);
          setEmail(storedData.email);
          setPhone(storedData.phone);
        } else {
          window.location.replace("./payment");
        }

        setInterval(function () {
          // Get today's date and time
          var now = new Date().getTime();

          // Find the distance between now and the count down date
          var distance = storedData.expirationTime - now;

          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Output the result in an element with id="demo"
          document.getElementById("expire").innerHTML =
            hours + ":" + minutes + ":" + seconds;

          // If the count down is over, write some text
          if (distance < 0) {
            clearInterval(x);
            document.getElementById("expire").innerHTML = "EXPIRED";
          }
        }, 1000);
      }
    }
  };

  const requsetToken = () => {
    const valid = validation();
    if (valid && !snapToken) {
      const generateRandomNumber = () => {
        const min = 1000000;
        const max = 9999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
      };
      const randomNum = generateRandomNumber();

      const postData = {
        idOrder: "ID-" + randomNum,
        total: total,
        name: name,
        email: email,
        phone: phone,
      };
      const url = baseUrl + "/api/midtrans";
      axios
        .post(url, postData)
        .then((response) => {
          console.log("Sukses:", response.data);
          setSnapToken(response.data.snapToken);
          localStorage.setItem(
            "dataLocal",
            JSON.stringify({
              name: name,
              email: email,
              phone: phone,
              snapToken: response.data.snapToken,
              expirationTime: new Date().getTime() + 24 * 60 * 60 * 1000,
            })
          );
          document.getElementById("start").classList.add("d-none");
          document.getElementById("payment").classList.remove("d-none");
        })
        .catch((error) => {
          console.error("Tanggapan error:", error);
        });
    }
  };

  const payButton = () => {
    window.snap.pay(snapToken, {
      onSuccess: function (result) {
        Swal.fire({
          title: "Payment Success",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      },
      onPending: function (result) {
        alert("wating your payment!");
      },
      onError: function (result) {
        alert("payment failed!");
      },
      onClose: function () {
        Swal.fire({
          title: "Payment Closed",
          text: "You closed the popup without finishing the payment",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      },
    });
  };

  const isNumber = (e) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(e)) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }
  };

  const validation = () => {
    var callBack = true;
    const fullnameID = document.getElementById("fullname");
    const emailID = document.getElementById("email");
    const phoneID = document.getElementById("phone");
    const totalID = document.getElementById("total");
    fullnameID.classList.remove("is-invalid");
    emailID.classList.remove("is-invalid");
    phoneID.classList.remove("is-invalid");
    totalID.classList.remove("is-invalid");
    if (name === "") {
      Swal.fire({
        title: "Full Name Field Error",
        text: "Nama harus diisi",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      fullnameID.classList.add("is-invalid");
      callBack = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email === "" || !emailPattern.test(email)) {
      Swal.fire({
        title: "Email Field Error",
        text: "Email harus diisi dengan format yang benar",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      emailID.classList.add("is-invalid");
      callBack = false;
    }

    const phonePattern = /^\d+$/;
    if (phone === "" || !phonePattern.test(phone)) {
      Swal.fire({
        title: "Phone Field Error",
        text: "Nomor Telepon harus diisi dengan angka",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      callBack = false;
      phoneID.classList.add("is-invalid");
    }
    if (total < 10000) {
      Swal.fire({
        title: "Total Payment Field Error",
        text: "Minimal Total Payment 10000",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      callBack = false;
      totalID.classList.add("is-invalid");
    }
    if (!callBack) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Head>
        <title>Payment</title>
        <link rel="icon" href="/assets/favicon/apple-icon-76x76.png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css"
        ></link>
        <script
          type="text/javascript"
          src={linkMid}
          data-client-key={clientKey}
          async
        ></script>
      </Head>
      <NavDesktop />
      <NavMobile />
      <NavButton />
      <div className="container col-xxl-8 px-4 py-5">
        <div
          className="row flex-lg-row-reverse align-items-center g-5 py-5"
          id="hero"
        >
          <div className="col-10 col-sm-8 col-lg-6 pt-3">
            <Image
              src={baseUrl + "/assets/img/hero.png"}
              alt="Hero"
              className="d-block mx-lg-auto img-fluid"
              width={700}
              height={500}
              priority
            />
          </div>
          <div className="col-lg-6">
            <a href="#">
              <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fkikukeii.github.io%2Fpayment&count_bg=%230007FF&title_bg=%23000000&icon=next-dot-js.svg&icon_color=%23E7E7E7&title=Visited&edge_flat=true" />
            </a>
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Payment
            </h1>
            <p className="lead">Semua transaksi akan tercatat.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <a href="#start" className="btn btn-outline-primary btn-lg px-4">
                Mulai
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-5" id="start">
        <hr />
        <h2 className="text-center p-5">Isi Data</h2>
        <div className="row">
          <div className="col-mn-12">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="fullname"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="fullname">Full Name</label>
            </div>
            <div className="invalid-feedback" id="fullnameFeedback">
              Please enter a message in the textarea.
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email address</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="phone"
                pattern="[0-9.]+"
                onInput={isNumber}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="phone">Phone</label>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control"
                id="total"
                placeholder="total"
                pattern="[0-9.]+"
                onInput={isNumber}
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
              <label htmlFor="total">Total Payment</label>
            </div>
          </div>

          <div className="col-md-12 text-center">
            <button
              className="btn btn-outline-primary rounded-0 fs-4"
              onClick={(e) => requsetToken()}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
      <div className="container pt-5 d-none" id="payment">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-3 rounded-0">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Detail <span id="expire" className="badge bg-danger"></span>
                </h5>
                <div className="card-text pt-3">
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>{email}</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>{name}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>:</td>
                        <td>{phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="lh-lg text-center">
                  Total yang harus dibayar <br />
                  <span className="fs-3">
                    {total.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated just now
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-12 text-center">
            <button
              className="btn btn-warning fs-2 text-white"
              onClick={(e) => payButton()}
            >
              Pay Now!!
            </button>
          </div>
        </div>
      </div>
      <div className="container py-5"></div>
      <div className="container py-5"></div>
      <div className="container py-5"></div>
      <FooterDesktop />
    </>
  );
};
export default Home;
