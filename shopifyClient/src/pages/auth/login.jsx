import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config/config";
import { loginUserAsyncThunk } from "@/store/auth/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsyncThunk(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/shop/home");
      } else {
        if (data?.payload?.message === "Validation Error") {
          toast({
            title: data?.payload?.message,
            description:
              data?.payload?.errors?.email || data?.payload?.errors?.password,
            variant: "destructive",
          });
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
          Sign In
        </h1>
      </div>
      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign In"}
      />
      <div className="text-center">
        <p className="mt-2">
          Don't have an account?
          <Link
            className="ml-2 font-medium text-primary hover:underline"
            to="/auth/register"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
