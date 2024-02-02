import APIClient from "./apiClient";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default new APIClient<Post>("/posts");
