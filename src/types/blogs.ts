export type Blog = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
};

export type CreateBlogDto = {
  name: string;
  description: string;
  websiteUrl: string;
};

export type UpdateBlogDto = {
  name: string;
  description: string;
  websiteUrl: string;
};