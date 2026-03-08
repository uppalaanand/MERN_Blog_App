import { useForm } from "react-hook-form";

function Register() {

  const { register, handleSubmit, formState: { errors }} = useForm();

  function onSubmit(obj) {
    console.log(obj);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Role */}
          <div>
            <span className="font-medium">Select Role :</span>

            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" value="User" {...register("role", { required: "Role is Required" })} />
                User
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" value="Author" {...register("role", { required: "Role is Required" })} />
                Author
              </label>
            </div>

            {errors.role && ( <p className="text-red-500 text-sm">{errors.role.message}</p> )}
          </div>

          {/* Name */}
          <div className="flex gap-4">
            <div className="w-full">
              <input type="text"
                placeholder="First name"
                className="w-full border p-2 rounded"
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
                className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
              {...register("profileImage", { required: "Image required" })}
            />
            {errors.profileImage && (
              <p className="text-red-500 text-sm">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-semibold transition"
          >
            Register
          </button>

        </form>
      </div>

    </div>
  );
}

export default Register;