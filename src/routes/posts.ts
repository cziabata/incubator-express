import { Router } from "express";
import { postsController } from "../controller/posts";
import { basicAuthGuardMiddleware } from "../middlewares/guards/basic-auth.guard";
import { createPostValidators, deletePostValidators, getPostByIdValidators, updatePostValidators } from "../middlewares/validators/posts";

export const postsRouter = Router();

postsRouter.get("/", postsController.getPosts);
postsRouter.get("/:id", ...getPostByIdValidators, postsController.getPostById);
postsRouter.post("/", basicAuthGuardMiddleware, ...createPostValidators, postsController.createPost);
postsRouter.put("/:id", basicAuthGuardMiddleware, ...updatePostValidators, postsController.updatePost);
postsRouter.delete("/:id", basicAuthGuardMiddleware, ...deletePostValidators, postsController.deletePost);