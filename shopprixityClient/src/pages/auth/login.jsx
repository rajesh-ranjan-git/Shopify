import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/hooks/use-toast";
import { loginFormControls } from "@/config/config";
import CommonForm from "@/components/common/form";
import googleAuthFirebase from "@/components/auth/googleAuthFirebase";
import { Button } from "@/components/ui/button";
import loginUserService from "@/services/auth/loginUserService";
import googleAuthFirebaseService from "@/services/auth/googleAuthFirebaseService";

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
    dispatch(loginUserService(formData)).then((data) => {
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
            title: data?.payload?.message || "Something went wrong!",
            variant: "destructive",
          });
        }
      }
    });
  };

  const handleGoogleAuthFirebase = async () => {
    const formData = await googleAuthFirebase();

    dispatch(googleAuthFirebaseService(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/shop/home");
      } else {
        if (data?.payload?.message === "Validation Error") {
          toast({
            title: data?.payload?.message,
            description: data?.payload?.errors?.email,
            variant: "destructive",
          });
        } else {
          toast({
            title: data?.payload?.message || "Something went wrong!",
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
      <Button
        className="flex items-center border-gray-300 bg-white hover:bg-gray-200 shadow-md px-6 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-full font-medium text-gray-800 text-sm focus:outline-none"
        onClick={() => handleGoogleAuthFirebase()}
      >
        <FcGoogle />
        <span>Continue with Google</span>
      </Button>
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
