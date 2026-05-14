// AllBlogs.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getActiveArticles } from "../services/api";

function AllBlogs() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);

        const res = await getActiveArticles();

        // show only active blogs
        const activeBlogs = res.data.payload.filter(
          (blog) => blog.isArticleActive
        );

        setArticles(activeBlogs);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-black py-20 px-6 md:px-16">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Explore Amazing
            <span className="text-amber-400"> Blogs</span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-8">
            Discover trending articles, coding tutorials, AI innovations,
            developer stories, career guidance, and modern technology insights.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-4 rounded-2xl shadow-xl transition duration-300 hover:scale-105">
              Trending Blogs
            </button>

            <button className="border border-gray-500 text-white hover:bg-white/10 px-8 py-4 rounded-2xl transition duration-300">
              Explore Categories
            </button>
          </div>
        </div>
      </div>

      {/* BLOG SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-14">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900">
              Latest Articles
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Read premium blogs written by passionate creators.
            </p>
          </div>

          <div className="mt-5 md:mt-0 flex items-center gap-3 bg-white shadow-md px-5 py-3 rounded-2xl">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

            <span className="font-semibold text-gray-700">
              {articles.length} Blogs Available
            </span>
          </div>
        </div>

        {/* BLOG GRID */}
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((blog, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/article/${blog._id}`)}
              className="group bg-white rounded-[30px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200 hover:border-amber-400"
            >


              {/* CONTENT */}
              <div className="p-7">

                {/* DATE */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                  <span>
                    📅 {new Date(blog.createdAt).toLocaleDateString()}
                  </span>

                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">
                    Tech Blog
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-bold text-gray-900 leading-snug group-hover:text-amber-500 transition duration-300">
                  {blog.title}
                </h3>

                {/* CONTENT */}
                <p className="text-gray-600 mt-4 leading-7 line-clamp-4">
                  {blog.content}
                </p>

                {/* AUTHOR */}
                <div className="mt-8 flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <img
                      src={
                        blog.author?.profileImageUrl ||
                        `https://ui-avatars.com/api/?name=${blog.author?.firstName}`
                      }
                      alt="author"
                      className="w-12 h-12 rounded-full border-2 border-amber-400 object-cover"
                    />

                    <div>
                      <h4 className="font-bold text-gray-800">
                        {blog.author?.firstName}{" "}
                        {blog.author?.lastName}
                      </h4>

                      <p className="text-sm text-gray-500">
                        Content Creator
                      </p>
                    </div>
                  </div>

                  <button className="bg-black text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-amber-500 hover:text-black transition duration-300 shadow-md">
                    Read →
                  </button>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-tr from-amber-400/10 to-yellow-300/5"></div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-24">
            <h2 className="text-4xl font-bold text-gray-800">
              No Blogs Available
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              New blogs will appear here soon.
            </p>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBlogs;