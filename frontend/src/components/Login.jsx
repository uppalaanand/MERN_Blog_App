import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { errorClass, labelClass } from "../styles/common";
import {toast} from 'react-hot-toast'

function Login() {
  const { register, handleSubmit, formState: { errors }} = useForm();

  const login = useAuth(state=>state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const error = useAuth((state) => state.error);
  
  const navigate = useNavigate();
  // console.log("Current user", currentUser);
  // console.log("is isAuthenticated", isAuthenticated);

  async function onSubmit(obj) {
    // console.log(obj);
    await login(obj);
  }

  useEffect(() => {
    if(isAuthenticated) {
      if(currentUser?.role === "USER") {
        toast.success("Loggidin Successfully");
        navigate("/user-profile");
      }
      if(currentUser?.role === "AUTHOR") {
        toast.success("Loggidin Successfully");
        navigate("/author-profile");
      }
      if(currentUser?.role === "ADMIN") {
        toast.success("Loggidin Successfully");
        navigate("/admin-profile");
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Loin</h2>
        {
          error?<p className={errorClass}>{error}</p>:<></>
        }
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className={labelClass}>Email:</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              {...register("email", { required: "Email required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              {...register("password", { required: "Password required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-semibold transition"
          >
            Login
          </button>

        </form>
      </div>

    </div>
  );
}

export default Login;