import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import capturePaymentService from "@/services/shop/order/capturePaymentService";

const PaypalReturnPage = () => {
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
          window.location.href = "/shop/paymentSuccess";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle classMane="text-4xl">Processing Payment...</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturnPage;
