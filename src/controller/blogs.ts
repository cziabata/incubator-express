import { type Request, type Response } from "express";
import { blogsService } from "../services/blogs";
import { CreateBlogDto, UpdateBlogDto } from "../types/blogs";

export const blogsController = {
  getBlogs(req: Request, res: Response) {
    const blogs = blogsService.getBlogs();
    res.send(blogs);
  },

  getBlogById(req: Request, res: Response) {
    const id = req.params.id as string;
    const blog = blogsService.getBlogById(id);
    if (blog) {
      res.send(blog);
    } else {
      res.status(404).send({ error: "Blog not found" });
    }
  },

  createBlog(req: Request, res: Response) {
    const blog: CreateBlogDto = req.body;
    const newBlog = blogsService.createBlog(blog);
    res.status(201).send(newBlog);
  },

  updateBlog(req: Request, res: Response) {
    const id = req.params.id as string;
    const blog: UpdateBlogDto = req.body;
    const updatedBlog = blogsService.updateBlog(id, blog);
    if (updatedBlog) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: "Blog not found" });
    }
  },

  deleteBlog(req: Request, res: Response) {
    const id = req.params.id as string;
    const deletedBlog = blogsService.deleteBlog(id);
    if (deletedBlog) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: "Blog not found" });
    }
  },
};
