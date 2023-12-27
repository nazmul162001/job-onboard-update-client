import React, { useEffect, useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Fade from "react-reveal/Fade";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../Auth/Firebase/Firebase.init";
import Loading from "../../../components/Loading/Loading";
import usePasswordToggle from "../../../hooks/usePasswordToggle";
import useTitle from "../../../hooks/useTitle";
import useToken from "../../../hooks/useToken";
import { FaRegCopy } from "react-icons/fa";

const Login = () => {
  useTitle("Login");
  const [passwordTogle, type, icon] = usePasswordToggle();
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [token] = useToken(user || gUser);
  const search = location.search?.split("=")?.[1];

  useEffect(() => {
    if (token) {
      if (!search) {
        navigate(from, { replace: true });
      } else {
        navigate(search);
      }
      toast.success(
        `Welcome Back, ${auth?.currentUser?.displayName} to Job Onboard!`,
        {
          autoClose: 4000,
          position: "top-center",
        }
      );
    }
  }, [navigate, from, token, search]);

  if (loading || gLoading) {
    return <Loading></Loading>;
  }

  if (error || gError) {
    signInError = (
      <p className="text-red-500">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!", {
          duration: 2000,
          position: "top-center",
        });
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        toast.error("Copy failed. Please try again.", {
          duration: 2000,
          position: "top-center",
        });
      });
  };

  return (
    <section className="container mx-auto bg-base-100 px-3 lg:px-10 py-3 lg:py-0">
      <div className="hero bg-base-100">
        <div className="flex justify-between items-center flex-col lg:flex-row-reverse">
          <Fade left distance="30px">
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col justify-center items-center lg:px-12 md:my-24 lg:my-0">
                <div className="pb-3 pt-2 md:pb-12 lg:pb-12 px-3 lg:px-0">
                  <h1 className="text-xl lg:text-3xl text-center font-bold pb-6">
                    Get Discovered by Top Employers and Hire your need
                  </h1>
                  <p className="text-center">
                    Find experts, post & monitor your circulars through this
                    applicant tracking system
                  </p>
                </div>
                <div className="card w-full max-w-lg lg:bg-base-300 shadow-xl">
                  <div className="card-body w-full">
                    <h2 className="text-center text-xl lg:text-2xl font-bold pb-3">
                      Please Login
                    </h2>
                    <p className="text-center font-semibold">
                      Don't have an account?{" "}
                      <Link className="text-primary" to="/signUp">
                        Candidate
                      </Link>{" "}
                      or{" "}
                      <Link className="text-primary" to="/signUp/hr">
                        HR Manager
                      </Link>
                    </p>
                    <div className="block lg:flex gap-2 py-2 lg:py-6 mx-auto">
                      <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline border-primary flex items-center content-center rounded hover:btn-primary mb-2 lg:mb-0"
                      >
                        <FcGoogle className="text-2xl mr-2"></FcGoogle>Login
                        with Google
                      </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-control w-full max-w-md">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <div className="p-2 mb-2 border">
                          <p className="flex gap-2 items-center text-[12px]">
                            <span>user@gmail.com</span>
                            <span
                              onClick={() => handleCopy("user@gmail.com")}
                              className="px-4 text-sm py-0 label-text cursor-pointer"
                            >
                              <FaRegCopy />
                            </span>
                          </p>
                          <p className="flex gap-2 items-center text-[12px] my-1">
                            <span>hr@gmail.com</span>
                            <span
                              onClick={() => handleCopy("hr@gmail.com")}
                              className="px-4 text-sm py-0 label-text cursor-pointer"
                            >
                              <FaRegCopy />
                            </span>
                          </p>
                          <p className="flex gap-2 items-center text-[12px] my-1">
                            <span>admin@gmail.com</span>
                            <span
                              onClick={() => handleCopy("admin@gmail.com")}
                              className="px-4 text-sm py-0 label-text cursor-pointer"
                            >
                              <FaRegCopy />
                            </span>
                          </p>
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          className="input input-bordered w-full max-w-md"
                          {...register("email", {
                            required: {
                              value: true,
                              message: "Email is Required",
                            },
                            pattern: {
                              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                              message: "Provide a valid Email",
                            },
                          })}
                        />
                        <label className="label">
                          {errors.email?.type === "required" && (
                            <span
                              data-testId="error"
                              className="label-text-alt text-red-500"
                            >
                              {errors.email.message}
                            </span>
                          )}
                          {errors.email?.type === "pattern" && (
                            <span className="label-text-alt text-red-500">
                              {errors.email.message}
                            </span>
                          )}
                        </label>
                      </div>
                      <div className="form-control w-full max-w-md">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>
                        <div className="p-2 mb-2 border">
                          <p className="flex gap-2 items-center text-[12px]">
                            <span>112233</span>
                            <span
                              onClick={() => handleCopy("112233")}
                              className="px-4 text-sm py-0 label-text cursor-pointer"
                            >
                              <FaRegCopy />
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center relative">
                          <input
                            type={type}
                            placeholder="Password"
                            className="input input-bordered w-full max-w-md"
                            {...register("password", {
                              required: {
                                value: true,
                                message: "Password is Required",
                              },
                              minLength: {
                                value: 6,
                                message: "Must be 6 characters or longer",
                              },
                            })}
                          />
                          <span
                            onClick={passwordTogle}
                            className="absolute right-3 cursor-pointer text-xl"
                          >
                            {icon}
                          </span>
                        </div>
                        <label className="label">
                          {errors.password?.type === "required" && (
                            <span className="label-text-alt text-red-500">
                              {errors.password.message}
                            </span>
                          )}
                          {errors.password?.type === "minLength" && (
                            <span className="label-text-alt text-red-500">
                              {errors.password.message}
                            </span>
                          )}
                        </label>
                      </div>

                      {signInError}
                      <span className="flex items-center justify-between">
                        <input
                          className="btn btn-primary w-full max-w-[100px] text-white shadow-md"
                          type="submit"
                          value="Login"
                        />
                        <Link
                          to="/resetPassword"
                          className="text-sm italic text-primary underline font-semibold flex justify-end items-center"
                        >
                          Forget password ?
                        </Link>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
          <Fade right distance="20px">
            <div className="w-full lg:w-1/2 rounded overflow-hidden lg:ml-6 hidden lg:block">
              <div className="outline-none h-full">
                <img
                  src="https://i.ibb.co/fn6rMQR/Repeat-Grid-3.png"
                  className=" md:rounded-lg h-full w-full"
                  alt=""
                />
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Login;
