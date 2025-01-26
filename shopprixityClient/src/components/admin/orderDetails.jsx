import React, { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CommonForm from "../common/form";

const initialFormData = {
  status: "",
};

const AdminOrderDetails = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleOrderStatus = (e) => {
    e.preventDefault();
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="gap-6 grid">
        <div className="gap-2 grid">
          <div className="flex justify-between items-center mt-6">
            <p className="font-medium">Order Id</p>
            <Label>1</Label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Date</p>
            <Label>02/01/2025</Label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Status</p>
            <Label>Delivered</Label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Price</p>
            <Label>₹1040</Label>
          </div>
        </div>
        <Separator />
        <div className="gap-4 grid">
          <div className="gap-2 grid">
            <div className="font-medium">Order Details</div>
            <ul className="gap-3 grid">
              <li className="flex justify-between item-center">
                <span>Product One</span>
                <span>₹100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="gap-4 grid">
          <div className="gap-2 grid">
            <div className="font-medium">Shipping Information</div>
            <div className="gap-0.5 grid text-muted-foreground">
              <span>Rahee</span>
              <span>Address</span>
              <span>City</span>
              <span>Pin Code</span>
              <span>Phone No.</span>
              <span>Notes</span>
            </div>
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
            onSubmit={handleOrderStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;
