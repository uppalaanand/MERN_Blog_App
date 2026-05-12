// import React from 'react'

// const Home = () => {
//   return (
//     <div>
//       Home
//     </div>
//   )
// } 

// export default Home

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    async function getLatestArticles() {
      try {
        setLoading(true);
        // console.log("cur", currentUser);
        const end = currentUser.role === "AUTHOR" ? "author-api" : "user-api";
        console.log("end", end);

        const resObj = await axios.get(
          `http://localhost:5000/${end}/articles`,
          { withCredentials: true }
        );

        // latest 3 blogs
        setArticles(resObj.data.payload.slice(0, 3));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getLatestArticles();
  }, []);

  return (
    <div className="px-6 md:px-16 py-10 bg-gray-50 min-h-screen">

      {/* Welcome Section */}
      <div className="text-center mb-16">
        {isAuthenticated && (
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome Back,{" "}
            <span className="text-amber-500">
              {currentUser.firstName}
            </span>
          </h1>
        )}

        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-8">
          “A blog is not just writing — it’s a way to share ideas,
          inspire people, and create impact through words.”
        </p>
      </div>

      {/* Latest Blogs Heading */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Latest Blogs
        </h2>

        <button
          onClick={() => navigate("/user-profile")}
          className="text-amber-500 font-semibold hover:underline"
        >
          View All →
        </button>
      </div>

      {/* Latest Blogs */}
      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          Loading...
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((art, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/article/${art._id}`)}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 cursor-pointer overflow-hidden group"
            >
              {/* Image
              <img
                src={art.imageUrl}
                alt=""
                className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
              /> */}

              {/* Content */}
              <div className="p-5">
                {/* Category */}
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-500">
                  {art.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mt-2 group-hover:text-amber-500 transition">
                  {art.title}
                </h3>

                {/* Content Preview */}
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {art.content}
                </p>

                {/* Footer */}
                <div className="mt-5 flex justify-between items-center text-sm text-gray-500">
                  <span>
                    {new Date(art.createdAt).toLocaleDateString()}
                  </span>

                  <span className="text-amber-500 font-semibold">
                    Read More →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;