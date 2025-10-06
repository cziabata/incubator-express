import { Router } from "express";
import { blogsController } from "../controller/blogs";
import { basicAuthGuardMiddleware } from "../middlewares/guards/basic-auth.guard";
import { createBlogValidators, deleteBlogValidators, getBlogByIdValidators, updateBlogValidators } from "../middlewares/validators/blogs";

export const blogsRouter = Router();

blogsRouter.get("/", blogsController.getBlogs);
blogsRouter.get("/:id", ...getBlogByIdValidators, blogsController.getBlogById);
blogsRouter.post("/", basicAuthGuardMiddleware, ...createBlogValidators, blogsController.createBlog);
blogsRouter.put("/:id", basicAuthGuardMiddleware, ...updateBlogValidators, blogsController.updateBlog);
blogsRouter.delete("/:id", basicAuthGuardMiddleware, ...deleteBlogValidators, blogsController.deleteBlog);