export type Tag = {
  name: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string };
  tags: Tag[];
};

export type PostList = {
  items: Post[];
  page: number;
  limit: number;
  total: number;
};
