import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import AddressCard from "./addressCard";
import CommonForm from "@/components/common/form";
import { addressFormControls } from "@/config/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import addAddressService from "@/services/shop/address/addAddressService";
import fetchAddressService from "@/services/shop/address/fetchAddressService";
import deleteAddressService from "@/services/shop/address/deleteAddressService";
import updateAddressService from "@/services/shop/address/updateAddressService";

const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

const Address = ({ setCurrentSelectedAddress, currentSelectAddressId }) => {
  const [currentUpdateAddressId, setCurrentUpdateAddressId] = useState(null);
  const [formData, setFormData] = useState(initialAddressFormData);
  const { user } = useSelector((state) => state.authReducer);
  const { addressList } = useSelector((state) => state.addressReducer);
  const { toast } = useToast();

  const dispatch = useDispatch();

  const handleAddress = (e) => {
    e.preventDefault();
    {
      currentUpdateAddressId !== null
        ? dispatch(
            updateAddressService({
              userId: user?.id,
              addressId: currentUpdateAddressId,
              formData: formData,
            })
          ).then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAddressService(user?.id));
              setCurrentUpdateAddressId(null);
              setFormData(initialAddressFormData);
              toast({
                title: data?.payload?.message,
              });
            } else {
              toast({
                title: data?.payload?.message,
                variant: "destructive",
              });
            }
          })
        : dispatch(addAddressService({ ...formData, userId: user?.id })).then(
            (data) => {
              if (data?.payload?.success) {
                dispatch(fetchAddressService(user?.id));
                setFormData(initialAddressFormData);
                toast({
                  title: data?.payload?.message,
                });
              } else {
                toast({
                  title: data?.payload?.message,
                  variant: "destructive",
                });
              }
            }
          );
    }
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const handleDeleteAddress = (addressItem) => {
    dispatch(
      deleteAddressService({ userId: user?.id, addressId: addressItem?.id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddressService(user?.id));
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message || "Something went wrong!",
          variant: "destructive",
        });
      }
    });
  };

  const handleUpdateAddress = (getCurrentAddressItem) => {
    setCurrentUpdateAddressId(getCurrentAddressItem?.id);
    setFormData({
      address: getCurrentAddressItem?.address,
      city: getCurrentAddressItem?.city,
      pincode: getCurrentAddressItem?.pincode,
      phone: getCurrentAddressItem?.phone,
      notes: getCurrentAddressItem?.notes,
    });
  };

  useEffect(() => {
    dispatch(fetchAddressService(user?.id));
  }, []);

  return (
    <Card>
      <div className="gap-2 grid lg:grid-cols-2 grid-col-1 mb-5 p-3">
        {addressList && addressList.length > 0 ? (
          addressList.map((addressItem) => (
            <AddressCard
              addressItem={addressItem}
              key={addressItem?.id}
              handleDeleteAddress={handleDeleteAddress}
              handleUpdateAddress={handleUpdateAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              currentSelectAddressId={currentSelectAddressId}
            />
          ))
        ) : (
          <p className="p-4">No address found!</p>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {currentUpdateAddressId !== null
            ? "Update your address"
            : "Add new address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentUpdateAddressId !== null ? "Update" : "Add"}
          isButtonDisabled={!isFormValid()}
          onSubmit={handleAddress}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
