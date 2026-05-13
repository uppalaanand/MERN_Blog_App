// import React, {useEffect, useState} from 'react'
// import { articleBody, articleCardClass, articleExcerpt, articleGrid, articleMeta, articleTitle, ghostBtn, pageTitleClass } from '../styles/common'
// import { useAuth } from '../store/authStore'
// import { useNavigate } from 'react-router';
// import axios from 'axios';

// function AuthorDashboard() {
//   const [articles, setArticles] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const currentUser = useAuth(state => state.currentUser);

//   const logout = useAuth(state => state.logout);
//   const navigate = useNavigate();

//   const onLogout = async () => {
//     //logout
//     await logout();
//     //navigate
//     navigate('/login');
//   }

//   useEffect(() => {
//     async function getArticlesByUser() {
//       try {
//         setLoading(true);
//         console.log("user", currentUser);
//         const {_id} = currentUser;
//         let resObj = await axios.get(`http://localhost:5000/author-api/articles/${_id}`, {withCredentials:true});
//         console.log("DatA", resObj)
//         setArticles(resObj.data.payload);
//       }catch(err) {
//         console.log(err)
//         setError(err);
//       }
//     }
//     getArticlesByUser();
//   }, []);

//   return (
//     <div className='flex flex-col justify-center m-10'>
//           <button className={ghostBtn} onClick={onLogout}>Logout</button>
//           <div>
//             <h1 className={pageTitleClass}>Your Articles</h1>
//             </div>
//             <div className={articleGrid}>
//               {
//                 articles.map((art, idx) => (<div key={idx} onClick={() => navigate(`/article/${art._id}`)} className={articleCardClass}>
//                   <p className={articleTitle}>{art.title}</p>
//                   <p className={articleExcerpt}>{art.category}</p>
//                   <p className={articleBody}>{art.content}</p>
//                   <p className={articleMeta}>Published On : {art.createdAt}</p>
//                 </div>))
//               }
//           </div>
//         </div>
//   )
// }

// export default AuthorDashboard


import React, { useEffect, useState } from 'react'
import { articleBody, articleCardClass, articleExcerpt, articleGrid, articleMeta, articleTitle, ghostBtn, headingClass, pageTitleClass } from '../styles/common'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from '../store/authStore';

function AuthorDashboard() {
  const [article, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {isAuthenticated, currentUser} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    async function getArticlesByUser() {
      try {
        setLoading(true);
        console.log("user", currentUser);
        const {_id} = currentUser;
        // let resObj = await axios.get(`http://localhost:5000/author-api/articles/${_id}`, {withCredentials:true});
        let resObj = await getArticlesByUser(_id);
        console.log("DatA", resObj)
        setArticles(resObj.data.payload);
      }catch(err) {
        console.log(err)
        setError(err);
      }
    }
    getArticlesByUser();
  }, []);

  return (
    <div className="bg-gray-50">

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

export default AuthorDashboard
