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


// import React, { useEffect, useState } from 'react'
// import { articleBody, articleCardClass, articleExcerpt, articleGrid, articleMeta, articleTitle, ghostBtn, headingClass, pageTitleClass } from '../styles/common'
// import { useNavigate } from 'react-router';
// import axios from 'axios';
// import { useAuth } from '../store/authStore';
// import { getAllArticles } from '../services/api';

// function UserDashbourd() {
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
//         let resObj = await getAllArticles();
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
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6 md:px-14 lg:px-20 py-12">

//       {/* HERO SECTION */}
//       <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-black via-gray-900 to-gray-800 p-10 md:p-14 shadow-2xl mb-14">
        
//         {/* Glow Effects */}
//         <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/20 blur-3xl rounded-full"></div>
//         <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-400/10 blur-3xl rounded-full"></div>

//         <div className="relative z-10">
//           {isAuthenticated && (
//             <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
//               Welcome back,{" "}
//               <span className="text-amber-400">
//                 {currentUser.firstName} {currentUser.lastName}
//               </span>
//             </h1>
//           )}

//           <p className="mt-4 text-gray-300 text-lg max-w-2xl leading-8">
//             Explore trending articles, latest technologies, programming
//             tutorials, AI innovations, and developer stories crafted for
//             passionate learners.
//           </p>

//           <div className="flex flex-wrap gap-4 mt-8">
//             <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-lg hover:scale-105">
//               Explore Blogs
//             </button>

//             <button className="border border-gray-500 hover:border-white hover:bg-white/10 text-white px-6 py-3 rounded-xl transition duration-300">
//               Trending Topics
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* SECTION TITLE */}
//       <div className="flex items-center justify-between mb-10">
//         <div>
//           <h2 className="text-4xl font-extrabold text-gray-900">
//             Latest Articles
//           </h2>

//           <p className="text-gray-500 mt-2">
//             Discover premium blogs curated for developers and tech enthusiasts.
//           </p>
//         </div>

//         <div className="hidden md:flex items-center gap-3">
//           <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
//           <span className="text-gray-600 font-medium">
//             {article.length} Articles Available
//           </span>
//         </div>
//       </div>

//       {/* BLOG GRID */}
//       <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
//         {article.map((art, idx) => (
//           <div
//             key={idx}
//             onClick={() => navigate(`/article/${art._id}`)}
//             className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 hover:border-amber-400 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
//           >

//             {/* Top Accent */}
//             {/* <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500"></div> */}

//             {/* Image Placeholder */}
//             {/* <div className="relative overflow-hidden">
//               <img
//                 src={`https://picsum.photos/600/400?random=${idx}`}
//                 alt="blog"
//                 className="h-56 w-full object-cover group-hover:scale-110 transition duration-700"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

//               <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide shadow-lg">
//                 {art.category}
//               </span>
//             </div> */}

//             {/* CONTENT */}
//             <div className="p-6">

//               {/* DATE */}
//               <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                 <span>
//                   📅 {new Date(art.createdAt).toLocaleDateString()}
//                 </span>

//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
//                   Tech Blog
//                 </span>
//               </div>

//               {/* TITLE */}
//               <h3 className="text-2xl font-bold text-gray-900 leading-snug mb-4 group-hover:text-amber-500 transition duration-300">
//                 {art.title}
//               </h3>

//               {/* CONTENT PREVIEW */}
//               <p className="text-gray-600 leading-7 line-clamp-4">
//                 {art.content}
//               </p>

//               {/* FOOTER */}
//               <div className="mt-8 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={`https://ui-avatars.com/api/?name=${art.title}`}
//                     alt="author"
//                     className="w-10 h-10 rounded-full border-2 border-amber-400"
//                   />

//                   <div>
//                     <p className="text-sm font-semibold text-gray-800">
//                       Blog Author
//                     </p>

//                     <p className="text-xs text-gray-500">
//                       Content Creator
//                     </p>
//                   </div>
//                 </div>

//                 <button className="bg-black text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-md">
//                   Read More →
//                 </button>
//               </div>
//             </div>

//             {/* Hover Glow */}
//             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-tr from-amber-400/10 to-yellow-300/5"></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default UserDashbourd