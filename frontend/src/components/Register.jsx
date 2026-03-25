import { useForm } from "react-hook-form";
import { errorClass, formTitle, inputClass, labelClass, loadingClass, submitBtn } from '../styles/common'
import { useEffect, useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router'

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState();
  const [preview, setPreview] = useState();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }} = useForm();

  async function onSubmit(newUser) {
    // console.log(newUser);
    //create a FormData object
    const formData = new FormData();
    //add all user properties to formData object
    // formData.append("role", newUser.role);
    // formData.append("firstName", newUser.firstName);
    // formData.append("lastName", newUser.lastName);
    // formData.append("email", newUser.email);
    // formData.append("password", newUser.password);
    // console.log(preview);
    // formData.append("profileImageUrl", preview);
    //2nd approach
    let { role, profileImageUrl, ...userObj } = newUser;
    //add all fields except profilePic to FormData object
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    // add profilePic to Formdata object
    formData.append("profileImageUrl", profileImageUrl[0]);
    //add image to formData object
    //Make api request to user 
    try{

      if(role === "USER") {
        //make api req
        let resObj = await axios.post("http://localhost:5000/user-api/users", formData);
        let res = resObj.data;
        if(res.status !== 201) {
          setError(res.reason);
        }
          // console.log("Response is:", res);
          navigate("/login");
          return;
      }

      if(role === "AUTHOR") {
        //make api req
        let resObj = await axios.post("http://localhost:5000/author-api/users", formData);
        let res = resObj.data;
        if(res.status !== 201) {
          setError(res.reason);
        }
          // console.log("Response is:", res);
          navigate("/login");
          return;
        
      }

    }catch(err) {
      setError(err.message?.data?.error || "Registration failed");
    }finally {
      setLoading(false);
    }
  }

  //Clean up Browser memory 
  useEffect(() => {
    return() => {
      if(preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  //loading
  if(loading) return <p className={loadingClass}>Loading...</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className={formTitle}>Register</h2>
        {
          (error)?<p className={errorClass}>{error}</p>:<></>
        }
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Role */}
          <div>
            <span className="font-medium">Select Role :</span>

            <div className="flex gap-6 mt-2">
              <label className={labelClass}>
                <input type="radio" value="USER" {...register("role", { required: "Role is Required" })} />
                User
              </label>

              <label className={labelClass}>
                <input type="radio" value="AUTHOR" {...register("role", { required: "Role is Required" })} />
                Author
              </label>

              <label className={labelClass}>
                <input type="radio" value="AADMIN" {...register("role", { required: "Role is Required" })} />
                Admin
              </label>
            </div>

            {errors.role && ( <p className="text-red-500 text-sm">{errors.role.message}</p> )}
          </div>

          {/* Name */}
          <div className="flex gap-4">
            <div className="w-full">
              <input type="text"
                placeholder="First name"
                className={inputClass}
                {...register("firstName", { required: "First name required" })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Last name"
                className={inputClass}
                {...register("lastName", { required: "Last name required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className={inputClass}
              {...register("email", { required: "Email required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className={inputClass}
              {...register("password", { required: "Password required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("profileImageUrl")}
              onChange={(e) => {

                  //get image file
                  const file = e.target.files[0];
                  // validation for image format
                  if (file) {
                      if (!["image/jpeg", "image/png"].includes(file.type)) {
                      setError("Only JPG or PNG allowed");
                      return;
                      }
                      //validation for file size
                      if (file.size > 2 * 1024 * 1024) {
                      setError("File size must be less than 2MB");
                      return;
                      }
                      //Converts file → temporary browser URL(create preview URL)
                      const previewUrl = URL.createObjectURL(file);
                      setPreview(previewUrl);
                      setError(null);
                  }

              }} />
              {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}
            {errors.profileImage && (
              <p className="text-red-500 text-sm">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className={submitBtn}
          >
            Register
          </button>

        </form>
      </div>

    </div>
  );
}

export default Register;