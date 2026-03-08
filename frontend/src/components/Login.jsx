import { useForm } from "react-hook-form";

function Login() {

  const { register, handleSubmit, formState: { errors }} = useForm();

  function onSubmit(obj) {
    console.log(obj);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Loin</h2>
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