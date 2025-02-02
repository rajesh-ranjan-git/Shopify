import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { registerFormControls } from "@/config/config";
import CommonForm from "@/components/common/form";
import registerUserService from "@/services/auth/registerUserService";

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
    dispatch(registerUserService(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/admin/dashboard");
      } else {
        if (data?.payload?.message === "Validation Error") {
          toast({
            title: data?.payload?.message,
            description:
              data?.payload?.errors?.name ||
              data?.payload?.errors?.email ||
              data?.payload?.errors?.password,
            variant: "destructive",
          });
        } else {
          toast({
            title: data?.payload?.message || "Something went wrong!",
            variant: "destructive",
          });
          return;
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
