import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/config";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const onSubmit = () => {};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
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
