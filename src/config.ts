import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3001;
export const BASIC_AUTH_LOGIN = process.env.BASIC_AUTH_LOGIN;
export const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;