import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";

const AddressCard = ({ addressInfo }) => {
  return (
    <Card>
      <CardContent className="gap-4 grid">
        <Label>{addressInfo?.address}</Label>
        <Label>{addressInfo?.city}</Label>
        <Label>{addressInfo?.pincode}</Label>
        <Label>{addressInfo?.phone}</Label>
        <Label>{addressInfo?.notes}</Label>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
