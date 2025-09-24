import express from "express";
import { setupApp } from "./setupApp.js"
import { PORT } from "./config.js"

const app = express();
setupApp(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
