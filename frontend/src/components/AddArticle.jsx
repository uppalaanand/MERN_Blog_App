import { useForm } from "react-hook-form";

function AddArticle() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-lg shadow-lg w-100">

        <h2 className="text-2xl font-bold text-center mb-8">
          Add Article
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Title"
              className="w-full border p-3 rounded-md"
              {...register("title", { required: "Title is required" })}
            />

            {errors.title && (
              <p className="text-red-500 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <select
              className="w-full border p-3 rounded-md"
              {...register("category", { required: "Category required" })}
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Sports">Sports</option>
            </select>

            {errors.category && (
              <p className="text-red-500 text-sm">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <textarea
              rows="6"
              placeholder="Content"
              className="w-full border p-3 rounded-md"
              {...register("content", { required: "Content required" })}
            ></textarea>

            {errors.content && (
              <p className="text-red-500 text-sm">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-md font-semibold transition"
          >
            Publish Article
          </button>

        </form>
      </div>

    </div>
  );
}

export default AddArticle;