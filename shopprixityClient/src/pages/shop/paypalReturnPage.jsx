import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import capturePaymentService from "@/services/shop/order/capturePaymentService";

const PaypalReturnPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const currentOrderId = JSON.parse(
        sessionStorage.getItem("currentOrderId")
      );

      dispatch(
        capturePaymentService({
          paymentId: paymentId,
          payerId: payerId,
          orderId: currentOrderId,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          navigate("/shop/paymentSuccess");
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing order...</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturnPage;
