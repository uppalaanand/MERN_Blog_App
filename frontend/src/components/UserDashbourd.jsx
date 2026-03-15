import React, { useEffect, useState } from 'react'
import { articleBody, articleCardClass, articleExcerpt, articleGrid, articleMeta, articleTitle, ghostBtn, headingClass, pageTitleClass } from '../styles/common'
import {toast} from 'react-hot-toast'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router';
import axios from 'axios';

function UserDashbourd() {
  const [article, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const logout = useAuth(state => state.logout);
  const navigate = useNavigate();

  const onLogout = async () => {
    //logout
    await logout();
    toast.success("Logging Out successfully...");
    //navigate
    navigate('/login');
  }

  useEffect(() => {
    try {
      async function getArticles() {
        setLoading(true);
        //make api req
        let resObj = await axios.get("http://localhost:5000/user-api/articles", {withCredentials:true});
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
    <div className='flex flex-col justify-center m-10'>
      <button className={ghostBtn} onClick={onLogout}>Logout</button>
      <div>
        <h1 className={pageTitleClass}>All Articles</h1>
        </div>
        <div className={articleGrid}>
          {
            article.map((art, idx) => (<div key={idx} className={articleCardClass} onClick={() => navigate(`/article/${art._id}`)}>
              <p className={articleTitle}>{art.title}</p>
              <p className={articleExcerpt}>{art.category}</p>
              <p className={articleBody}>{art.content}</p>
              <p className={articleMeta}>Published On : {art.createdAt}</p>
            </div>))
          }
      </div>
    </div>
  )
}

export default UserDashbourd
