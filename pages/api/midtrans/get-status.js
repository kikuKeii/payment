require("dotenv").config();
const corsOptions = {
  origin: ["https://kikukeii.github.io", "https://payment-kiki.vercel.app"], // Allow requests from your local development environment
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
export default function handler(req, res) {
  cors(corsOptions)(req, res, () => {
    const midtransClient = require("midtrans-client");
    var prod = false;
    if (process.env.IS_PRODUCTION == "production") {
      prod = true;
    }
    const core = new midtransClient.CoreApi({
      isProduction: prod,
      serverKey: process.env.SEVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    // Define the transaction ID that you want to check
    const { order_id } = req.body;

    // Get transaction status
    core.transaction
      .status(order_id)
      .then((response) => {
        res.status(200).json({
          status: response,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}
