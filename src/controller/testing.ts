import { type Request, type Response } from "express";
import { testingService } from "../services/testing";

export const testingController = {
  clearDb(req: Request, res: Response) {
    testingService.clearDb();
    res.status(204).send();
  },
};