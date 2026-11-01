export type Tag = {
  name: string;
};

export type TagCount = {
  name: string;
  postCount: number;
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

export type User = {
  id: string;
  email: string;
  name: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type FormState = {
  error?: string;
};

export type PostFormState = {
  error?: string;
  values?: {
    title: string;
    content: string;
    tags: string;
    published: boolean;
  };
};
