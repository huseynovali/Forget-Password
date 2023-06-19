import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { instance } from "../service/axiosInstance"
import { Link, Navigate, useNavigate } from "react-router-dom"


const Register = () => {
  const [err, setErr] = useState('')
  useEffect(() => {
    setTimeout(() => { setErr("") }, 2000)
  }, [err])

  const initialValues = {
    name: "",
    email: "",
    password: ""
  };


  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email("Enter a valid email address").required("Email is required!"),
    password: Yup.string().required("Password is required")
  });
  const navigate = useNavigate();


  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await instance.post("/auth/register", values);
      navigate("/login")
    } catch (error) {
      setErr(error);
    }
  };


  return (
    <div className=" py-24 flex justify-center items-center">
      <div className="bg-slate-300 p-3 rounded-lg w-[80vw] md:w-[50vw] lg:w-[30vw] flex flex-col justify-center items-center">
        {
          err &&
          <figure className="notification bg-red-500 absolute top-10 w-[80%] p-5 z-20 rounded-lg ">
            <div className="notification__body text-white text-xl">
              {err.response.data.message}
            </div>

          </figure>
        }
        <h2 className="text-3xl">Sing Up</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="login-form py-6">


            <div className=" input__group my-5">
              <label htmlFor="name" className="my-2 block">Name</label>
              <Field type="text" id="name" name="name" className="py-2 rounded-md" />
              <ErrorMessage name="name" component="div" className="error-message text-red-400" />
            </div>

            <div className=" input__group my-5">
              <label htmlFor="email" className="my-2 block">Email</label>
              <Field type="email" id="email" name="email" className="py-2 rounded-md" />
              <ErrorMessage name="email" component="div" className="error-message text-red-400" />
            </div>
            <div>
              <label htmlFor="password" className="my-2 block">Password</label>
              <Field type="password" id="password" name="password" className="py-2 rounded-md" />
              <ErrorMessage name="password" component="div" className="error-message  text-red-400" />
            </div>
            <div className="button__group w-full flex justify-center items-end flex-col">
              <button type="submit" className="py-3 px-5 my-3 rounded-lg text-white  bg-orange-400">Submit</button>
              <Link to="/login" className="mt-5 z-20"> <button className="py-2 px-3 my-2 rounded-lg text-white z-10">Daxil ol</button></Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>

  );
};

export default Register;