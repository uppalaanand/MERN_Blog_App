import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router"
import { articleBody, articleMeta, divider, errorClass, headingClass, loadingClass, pageBackground, pageWrapper, tagClass } from "../styles/common";

function SingleArticle() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);

  const location = useLocation();
  const {id} = useParams();
  // setArticle(location.state);
  // console.log(id);

  useEffect(() => {
    async function getArticle() {
      try {
        if(location.state) {
          setArticle(location.state);
          // console.log("state:", location.state);
          return;
        }
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/common-api/article/${id}`);
        // console.log("api",res.data);
        setArticle(res.data.payload);
      }catch(err) {
        setError(err);
      }finally{
        setLoading(false);
      }
    }
    getArticle();
  }, [id, location.state]);

  if(loading) return <p className={loadingClass}>Loading...</p>
  if(error) return <p className={errorClass}>{error}</p>

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>

        {article && (
          <div className="max-w-3xl">

            <span className={tagClass}>{article.category}</span>

            <h1 className={`${headingClass} mt-2`}>
              {article.title}
            </h1>

            <p className={`${articleMeta} mt-1`}>
              Published on{" "}
              {new Date(article.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata"
              })} IST
            </p>

            <div className={divider}></div>

            <p className={articleBody}>
              {article.content}
            </p>

          </div>
        )}

      </div>
    </div>
  )
}

export default SingleArticle