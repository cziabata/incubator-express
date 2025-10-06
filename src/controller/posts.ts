import { type Request, type Response } from "express";
import { postsService } from "../services/posts";
import { UpdatePostDto } from "../types/posts";
import { CreatePostDto } from "../types/posts";

export const postsController = {
  getPosts(req: Request, res: Response) {
    const posts = postsService.getPosts();
    res.send(posts);
  },

  getPostById(req: Request, res: Response) {
    const id = req.params.id as string;
    const post = postsService.getPostById(id);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send({ error: "Post not found" });
    }
  },

  createPost(req: Request, res: Response) {
    const post: CreatePostDto = req.body;
    const newPost = postsService.createPost(post);
    res.status(201).send(newPost);
  },
  
  updatePost(req: Request, res: Response) {
    const id = req.params.id as string;
    const post: UpdatePostDto = req.body;
    const updatedPost = postsService.updatePost(id, post);
    if (updatedPost) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: "Post not found" });
    }
  },

  deletePost(req: Request, res: Response) {
    const id = req.params.id as string;
    const deletedPost = postsService.deletePost(id);
    if (deletedPost) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: "Post not found" });
    }
  },
};
