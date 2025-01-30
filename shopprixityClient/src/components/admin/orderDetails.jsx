import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CommonForm from "@/components/common/form";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import updateOrderStatusService from "@/services/admin/order/updateOrderStatusService";
import fetchAdminOrderDetailsService from "@/services/admin/order/fetchAdminOrderDetailsService";
import fetchAllOrdersService from "@/services/admin/order/fetchAllOrdersService";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  status: "",
};

const AdminOrderDetails = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleUpdateOrderStatus = (e) => {
    e.preventDefault();
    const status = formData;
    dispatch(
      updateOrderStatusService({
        orderId: orderDetails?.id,
        orderStatus: status,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAdminOrderDetailsService(orderDetails?.id));
        dispatch(fetchAllOrdersService());
        setFormData(initialFormData);
        toast({
          title: "Order status updated successfully!",
        });
      }
    });
  };

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
                  orderDetails?.orderStatus === "confirmed"
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
                      <span>Title : {item?.title}</span>
                      <span>Price : ₹{item?.price}</span>
                      <span>Quantity : {item?.quantity}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                placeholder: "Choose category",
                options: [
                  { id: "inTransit", label: "In Transit" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "rejected", label: "Rejected" },
                  { id: "pending", label: "pending" },
                  { id: "delivered", label: "Delivered" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateOrderStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;
