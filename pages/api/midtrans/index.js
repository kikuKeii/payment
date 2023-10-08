require("dotenv").config();

export default function handler(req, res) {
  const midtransClient = require("midtrans-client");
  var prod = false;
  if (process.env.IS_PRODUCTION == "production") {
    prod = true;
  }
  let snap = new midtransClient.Snap({
    isProduction: prod,
    serverKey: process.env.SEVER_KEY,
    clientKey: process.env.CLIENT_KEY,
  });

  const { idOrder, total, name, email, phone } = req.body;
  let parameter = {
    transaction_details: {
      order_id: idOrder,
      gross_amount: total,
    },
    item_details: [
      {
        id: "pay01",
        price: total,
        quantity: 1,
        name: "service",
      },
    ],
    customer_details: {
      first_name: name,
      last_name: "",
      email: email,
      phone: phone,
    },
  };

  snap.createTransaction(parameter).then((transaction) => {
    let transactionToken = transaction.token;
    res.status(200).json({
      snapToken: transactionToken,
      parameter: parameter,
    });
  });
}