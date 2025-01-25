import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config/config";

const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);

  const handleAddress = (e) => {
    e.preventDefault();
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  return (
    <Card>
      <div>Address List</div>
      <CardHeader>
        <CardTitle>Add new address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Add"}
          isButtonDisabled={!isFormValid()}
          onSubmit={handleAddress}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
