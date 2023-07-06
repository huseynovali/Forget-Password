import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, json, useNavigate } from "react-router-dom"
import { instance } from "../service/axiosInstance"
const Login = () => {
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => { setErr("") }, 2000)
    }, [err])


    const initialValues = {
        email: "",
        password: ""
    };


    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Enter a valid email address").required("Email is required!"),
        password: Yup.string().required("Password is required")

    });


    const handleSubmit = async (values, { resetForm }) => {

        try {
            const response = await instance.post("/auth", values);
            localStorage.setItem("user", JSON.stringify(response.data.user.name));
            localStorage.setItem("userId", JSON.stringify(response.data.user._id));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            setTimeout(() => { navigate("/"); }, 1000)
            resetForm();
        } catch (error) {
            setErr(error);
        }
    };

    return (
        <>

            {
                err &&
                <figure className="notification bg-red-500 absolute top-10 w-[80%] p-5 z-20 rounded-lg ">
                    <div className="notification__body text-white text-xl">
                        {err.response.data.message}
                    </div>

                </figure>
            }


            <div className="login__page py-24 flex justify-center items-center">
                <div className="login__container w-[80vw] md:w-[50vw] lg:w-[30vw] flex flex-col justify-center items-center relative bg-slate-300 p-3 rounded-lg">

                    <h2 className="text-3xl">Login</h2>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                        <Form className="login-form py-10">
                            <div className=" input__group my-5">
                                <label htmlFor="email" className="my-2 block">Email</label>
                                <Field type="email" id="email" name="email" className="py-2 rounded-md  px-1" />
                                <ErrorMessage name="email" component="div" className="error-message text-red-400" />
                            </div>
                            <div>
                                <label htmlFor="password" className="my-2 block">Password</label>
                                <Field type="password" id="password" name="password" className="py-2 rounded-md px-1" />
                                <ErrorMessage name="password" component="div" className="error-message  text-red-400" />
                            </div>
                            <div className="button__group w-full flex justify-center items-end flex-col">
                                <button type="submit" className="py-3 px-5 my-4 rounded-lg text-white z-10 bg-orange-400">Submit</button>
                                <Link to="/register" className="mt-5 z-20"><button className="py-2  px-3 rounded-lg text-white ">Sign Up</button></Link>
                                <Link to="/forgetpassword" className="mt-5 z-20"><button className="py-2  px-3 rounded-lg text-white ">forget password</button></Link>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>


    );
};

export default Login;