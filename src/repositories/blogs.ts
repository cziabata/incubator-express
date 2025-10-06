import { Blog, CreateBlogDto, UpdateBlogDto } from "../types/blogs";

let blogs: Blog[] = [
  { id: "1", name: "Blog 1", description: "Blog 1 description", websiteUrl: "https://blog1.com" },
  { id: "2", name: "Blog 2", description: "Blog 2 description", websiteUrl: "https://blog2.com" },
  { id: "3", name: "Blog 3", description: "Blog 3 description", websiteUrl: "https://blog3.com" },
];

export const blogsRepository = {
  getBlogs(): Blog[] {
    return blogs;
  },

  getBlogById(id: string): Blog | null {
    const result = blogs.find((blog) => blog.id === id) ?? null;
    return result;
  },

  createBlog(blog: CreateBlogDto): Blog {
    const newBlog = { id: String(blogs.length + 1), ...blog };
    blogs.push(newBlog);
    return newBlog;
  },

  updateBlog(id: string, blog: UpdateBlogDto): Blog | null {
    const targetBlog = blogs.find((blog) => blog.id === id) ?? null;
    if (targetBlog) {
      const updatedBlog = { ...targetBlog, ...blog };
      blogs = blogs.map((blog) => blog.id === id ? updatedBlog : blog);
      return updatedBlog;
    }
    return null;
  },

  deleteBlog(id: string): Blog | null {
    const targetBlog = blogs.find((blog) => blog.id === id) ?? null;
    if (targetBlog) {
      blogs = blogs.filter((blog) => blog.id !== id);
      return targetBlog;
    }
    return null;
  },

  clearBlogs(): void {
    blogs = [];
  },
};