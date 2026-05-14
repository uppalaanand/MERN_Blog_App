// import React, { useEffect, useState } from 'react'
// import { articleBody, articleCardClass, articleExcerpt, articleGrid, articleMeta, articleTitle, ghostBtn, headingClass, pageTitleClass } from '../styles/common'
// import { useNavigate } from 'react-router';
// import axios from 'axios';
// import { useAuth } from '../store/authStore';
// import { getActiveArticles, getAdminArticles, getAllArticles } from '../services/api';

// function AdminDashboard() {
//   const [article, setArticles] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const {isAuthenticated, currentUser} = useAuth();

//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       async function getArticles() {
//         setLoading(true);
//         //make api req
//         // let resObj = await axios.get("http://localhost:5000/user-api/articles", {withCredentials:true});
//         let resObj = await getActiveArticles();
//         //change state
//         console.log("res",resObj);
//         setArticles(resObj.data.payload);
//       }
//       getArticles();

//     }catch(err) {
//       console.log(err)
//       setError(err.response?.data?.error);
//     }finally {
//       setLoading(false);
//     }
//   }, [])

//   return (
//     <div className="px-6 md:px-16 py-10 bg-gray-50 min-h-screen">

//       {/* Header Section */}
//       <div className="mb-10">
//         {isAuthenticated && (
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             👋 Welcome,{" "}
//             <span className="text-amber-500">
//               {currentUser.firstName} {currentUser.lastName}
//             </span>
//           </h1>
//         )}

//         <h2 className="text-2xl font-semibold text-gray-700">
//           All Articles
//         </h2>
//       </div>

//       {/* Articles Grid */}
//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {article.map((art, idx) => (
//           <div
//             key={idx}
//             onClick={() => navigate(`/article/${art._id}`)}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition duration-300 p-5 flex flex-col justify-between group"
//           >
//             {/* Category */}
//             <span className="text-xs font-semibold text-amber-500 uppercase tracking-wide mb-2">
//               {art.category}
//             </span>
//             {/* Title */}
//             <h3 className="text-lg font-bold text-gray-800 group-hover:text-amber-500 transition">
//               {art.title}
//             </h3>
//             {/* Content Preview */}
//             <p className="text-sm text-gray-600 mt-2 line-clamp-3">
//               {art.content}
//             </p>
//             {/* Footer */}
//             <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
//               <span>
//                 {new Date(art.createdAt).toLocaleDateString()}
//               </span>
//               <span className="text-amber-500 font-semibold group-hover:underline">
//                 Read More →
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard


// AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { blockUsers, getAdminArticles, getAllArticles, unblockUsers } from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);

      // const res = await axios.get("http://localhost:5000/admin-api/articles",{ withCredentials: true });
      const res = await getAdminArticles();
      // console.log("RES", res);
      setUsers(res.data.payload);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // BLOCK USER
  const blockUser = async (userId) => {
    try {
      // const res = await axios.put(
      //   `http://localhost:5000/admin-api/block-user/${userId}`,
      //   {},
      //   {
      //     withCredentials: true,
      //   }
      // );
      const res = await blockUsers(userId);
      console.log("RES", res);
      toast.success(res.data.message);

      fetchUsers();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
    }
  };

  // UNBLOCK USER
  const unblockUser = async (userId) => {
    try {
      // const res = await axios.put(
      //   `http://localhost:5000/admin-api/unblock-user/${userId}`,
      //   {},
      //   {
      //     withCredentials: true,
      //   }
      // );
      const res = await unblockUsers(userId);

      toast.success(res.data.message);

      fetchUsers();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6 md:p-20">

      {/* HEADER */}
      <div className="bg-[#111111] rounded-3xl px-8 md:px-12 py-10 mb-12 border border-zinc-800 shadow-lg relative overflow-hidden">

          {/* subtle glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            {/* heading */}
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-zinc-400 mt-3 text-[15px] md:text-base max-w-2xl leading-7">
              Manage users, monitor activity, and control platform access.
            </p>
            {/* stats */}
            <div className="mt-10 flex items-center gap-10 flex-wrap">
              {/* total */}
              <div>
                <h2 className="text-3xl font-semibold text-white">
                  {users.length}
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                  Total Users
                </p>
              </div>
              
              {/* divider */}
              <div className="h-12 w-px bg-zinc-800"></div>

              {/* blocked */}
              <div>
                <h2 className="text-3xl font-semibold text-red-400">
                  {users.filter((user) => !user.isActive).length}
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  Blocked Users
                </p>
              </div>

              {/* divider */}
              <div className="h-12 w-px bg-zinc-800"></div>

              {/* active */}
              <div>
                <h2 className="text-3xl font-semibold text-green-400">
                  {users.filter((user) => user.isActive).length}
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  Active Users
                </p>
              </div>

            </div>
          </div>
        </div>

      {/* USERS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900">
              All Users
            </h2>

            <p className="text-gray-500 mt-2">
              Control user permissions and account status.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-white shadow-md px-5 py-3 rounded-2xl">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

            <span className="font-semibold text-gray-700">
              System Active
            </span>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

            {users.map((user, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[28px] border border-gray-200 shadow-md hover:shadow-2xl transition duration-500 overflow-hidden group"
              >

                {/* TOP BAR */}
                {/* <div
                  className={`h-2 ${
                    user.isActive
                      ? "bg-gradient-to-r from-green-400 to-emerald-500"
                      : "bg-gradient-to-r from-red-400 to-rose-500"
                  }`}
                ></div> */}

                <div className="p-5">

                  {/* PROFILE */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        user.profileImageUrl ||
                        `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
                      }
                      alt="profile"
                      className="w-20 h-20 rounded-full border-4 border-amber-400 object-cover shadow-lg"
                    />

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {user.email}
                      </p>

                      <span className="inline-block mt-3 bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="pl-10 pr-5 mt-8 flex items-center justify-between">

                    <div>
                      <p className="text-sm text-gray-500">Account Status</p>

                      <div className={`mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                          user.isActive ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            user.isActive
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>

                        {user.isActive ? "Active" : "Blocked"}
                      </div>
                    </div>

                    {/* BUTTON */}
                    {user.isActive ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          blockUser(user._id);
                        }}
                        className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-medium text-sm transition cursor-pointer"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          unblockUser(user._id);
                        }}
                        className="px-4 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 font-medium text-sm transition cursor-pointer"
                      >
                        Unblock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;