import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/config";
import { registerUserService } from "@/services/auth/registerUserService";

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

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("formData from register : ", formData);
    registerUserService(formData);
    // dispatch(registerUserService(formData)).then((data) => {
    //   console.log("data : ", data);
    //   if (data?.payload?.success) {
    //     navigate("/auth/login");
    //   }
    // });
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
