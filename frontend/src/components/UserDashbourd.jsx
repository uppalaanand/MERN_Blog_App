import React, { useEffect, useState } from 'react'
import { articleBody, articleCardClass, articleExcerpt, articleGrid, articleMeta, articleTitle, ghostBtn, headingClass, pageTitleClass } from '../styles/common'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from '../store/authStore';
import { getAllArticles } from '../services/api';

function UserDashbourd() {
  const [article, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {isAuthenticated, currentUser} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function getArticles() {
        setLoading(true);
        //make api req
        // let resObj = await axios.get("http://localhost:5000/user-api/articles", {withCredentials:true});
        let resObj = await getAllArticles();
        //change state
        console.log("res",resObj);
        setArticles(resObj.data.payload);
      }
      getArticles();

    }catch(err) {
      console.log(err)
      setError(err.response?.data?.error);
    }finally {
      setLoading(false);
    }
  }, [])

  return (
    <div className="px-6 md:px-16 py-10 bg-gray-50 min-h-screen">

      {/* Header Section */}
      <div className="mb-10">
        {isAuthenticated && (
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            👋 Welcome,{" "}
            <span className="text-amber-500">
              {currentUser.firstName} {currentUser.lastName}
            </span>
          </h1>
        )}

        <h2 className="text-2xl font-semibold text-gray-700">
          All Articles
        </h2>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {article.map((art, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/article/${art._id}`)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition duration-300 p-5 flex flex-col justify-between group"
          >
            {/* Category */}
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wide mb-2">
              {art.category}
            </span>
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-amber-500 transition">
              {art.title}
            </h3>
            {/* Content Preview */}
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {art.content}
            </p>
            {/* Footer */}
            <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
              <span>
                {new Date(art.createdAt).toLocaleDateString()}
              </span>
              <span className="text-amber-500 font-semibold group-hover:underline">
                Read More →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserDashbourd
