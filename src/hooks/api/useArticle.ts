import { useQuery, useMutation } from "@tanstack/react-query";
import {
  findArticles,
  postArticle,
  findArticle,
  deleteArticle,
} from "src/api/article";

export const useArticles = () => {
  return useQuery(["articles"], () => findArticles());
};

export const useArticle = (id: string) => {
  return useQuery(["article"], () => findArticle(id));
};

export const usePostArticle = () => {
  return useMutation({ mutationFn: postArticle });
};

export const useDeleteArticle = () => {
  return useMutation({ mutationFn: deleteArticle });
};
