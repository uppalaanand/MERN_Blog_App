import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:4000"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // needed for httpOnly cookies
});


export const registerUser = (data) =>
  api.post("/user-api/users", data);

export const registerAuthor = (data) => 
  api.post("/author-api/users", data);

export const createArticle = (data) => 
  api.post("/author-api/articles", data);

export const createComment = (data) =>
  api.post("/user-api/comments", data);

export const getAllArticles = () => api.get("/user-api/articles");

export const getArticleById = (id) => 
  api.get(`/common-api/article/${id}`);

export const editArticle = (data) => 
  api.put("/author-api/articles", data);

export const getArticleByUser = (id) => 
  api.get(`/author-api/articles/${id}`);

export const login = (data) => 
  api.post("/common-api/login", data);

export const logout = () =>
  api.get("/common-api/logout");

export const refreshPage = () =>
  api.get("/common-api/check-auth");

export const changeArticleStatus = (id, newStatus) =>
  api.patch(`/author-api/articles/${id}/status`, { isArticleActive: newStatus });

export const getActiveArticles = () =>
  api.get("/common-api/articles");

export const getAdminArticles = () =>
  api.get("/admin-api/articles");

export const blockUsers = (userId) =>
  api.put(`/admin-api/block-user/${userId}`, {})

export const unblockUsers = (userId) =>
  api.put(`/admin-api/unblock-user/${userId}`, {})
