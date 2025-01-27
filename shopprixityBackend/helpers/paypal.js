import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_API_CLIENT_ID,
  client_secret: process.env.PAYPAL_API_SECRET,
});

export default paypal;
