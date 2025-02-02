import React from "react";
import { useSelector } from "react-redux";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const ShopOrderDetails = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogTitle className="hidden"></DialogTitle>
      <DialogDescription className="hidden"></DialogDescription>
      <div className="gap-6 grid">
        <div className="gap-2 grid">
          <div className="flex justify-between items-center mt-6">
            <p className="font-medium">Order Id</p>
            <Label>{orderDetails?.id}</Label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Status</p>
            <Label>
              <Badge
                className={`${
                  orderDetails?.orderStatus === "confirmed" ||
                  orderDetails?.orderStatus === "delivered"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                } px-3 py-1`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Price</p>
            <Label>₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
        </div>
        <Separator />
        <div className="gap-4 grid">
          <div className="gap-2 grid">
            <div className="font-medium">Order Details</div>
            <ul className="gap-3 grid">
              {orderDetails?.orderItems && orderDetails?.orderItems?.length > 0
                ? orderDetails.orderItems.map((item) => (
                    <li
                      className="flex justify-between item-center"
                      key={item?.title}
                    >
                      <span>
                        <b>Title :</b> {item?.title}
                      </span>
                      <span>
                        <b>Price :</b> ₹{item?.price}
                      </span>
                      <span>
                        <b>Quantity :</b> {item?.quantity}
                      </span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="gap-4 grid">
          <div className="gap-2 grid">
            <div className="font-medium">Shipping Information</div>
            <div className="gap-0.5 grid text-muted-foreground">
              <span>
                <b>Name :</b> {user.name}
              </span>
              <span>
                <b>Address :</b> {orderDetails?.shippingAddress?.address}
              </span>
              <span>
                <b>City :</b> {orderDetails?.shippingAddress?.city}
              </span>
              <span>
                <b>Pin C</b>ode : {orderDetails?.shippingAddress?.pincode}
              </span>
              <span>
                <b>Phone N</b>o. : {orderDetails?.shippingAddress?.phone}
              </span>
              <span>
                <b>Notes :</b> {orderDetails?.shippingAddress?.notes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShopOrderDetails;
