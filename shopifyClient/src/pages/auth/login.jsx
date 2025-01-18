import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config/config";

const initialState = {
  email: "",
  password: "",
};

const onSubmit = () => {};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
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
