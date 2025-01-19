import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/config";
import { registerUserAsyncThunk } from "@/store/auth/authSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserAsyncThunk(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        if (data?.payload?.message === "Validation Error") {
          if (data?.payload?.errors?.name) {
            toast({
              title: data?.payload?.errors?.name,
              variant: "destructive",
            });
          }
          if (data?.payload?.errors?.email) {
            toast({
              title: data?.payload?.errors?.email,
              variant: "destructive",
            });
          }
          if (data?.payload?.errors?.password) {
            toast({
              title: data?.payload?.errors?.password,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      }
    });
  };

  return (
    <div className="space-y-6 mx-auto w-full max-w-md">
      <div className="text-center">
        <h1 className="font-bold text-3xl text-foreground tracking-tight">
          Create an account
        </h1>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign Up"}
      />
      <div className="text-center">
        <p className="mt-2">
          Already have an account?
          <Link
            className="ml-2 font-medium text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
