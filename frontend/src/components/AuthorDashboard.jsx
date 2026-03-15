import React, {useEffect, useState} from 'react'
import { articleBody, articleCardClass, articleExcerpt, articleGrid, articleMeta, articleTitle, ghostBtn, pageTitleClass } from '../styles/common'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router';
import axios from 'axios';

function AuthorDashboard() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth(state => state.currentUser);

  const logout = useAuth(state => state.logout);
  const navigate = useNavigate();

  const onLogout = async () => {
    //logout
    await logout();
    //navigate
    navigate('/login');
  }

  useEffect(() => {
    async function getArticlesByUser() {
      try {
        setLoading(true);
        console.log("user", currentUser);
        const {_id} = currentUser;
        let resObj = await axios.get(`http://localhost:5000/author-api/articles/${id}`, {withCredentials:true});
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
    <div className='flex flex-col justify-center m-10'>
          <button className={ghostBtn} onClick={onLogout}>Logout</button>
          <div>
            <h1 className={pageTitleClass}>Your Articles</h1>
            </div>
            <div className={articleGrid}>
              {
                articles.map((art, idx) => (<div key={idx} className={articleCardClass}>
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

export default AuthorDashboard
