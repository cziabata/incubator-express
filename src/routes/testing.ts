import { Router } from "express";
import { testingController } from "../controller/testing";

export const testingRouter = Router();

testingRouter.delete("/all-data", testingController.clearDb);