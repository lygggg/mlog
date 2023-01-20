import api from "./core";
import { PostArticleRequest } from "src/models/article";

export const postArticle = async (data: PostArticleRequest) => {
  return await api.post("/api/article", data);
};
export const deleteArticle = async (id: string | string[] | undefined) => {
  const { data } = await api.delete(`/api/article?id=${id}`);
  return data;
};

export const findArticles = async () => {
  const { data } = await api.get(`/api/articles`);
  return data;
};

export const findArticle = async (id: string) => {
  const { data } = await api.get(`/api/articles/${id as string}`);
  return data;
};
