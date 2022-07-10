import express from "express";
import { config } from "dotenv";
config();
const app = express();
const port = process.env.PORT || 5000;
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import connection from "./connection/config.js";
import cookieParser from "cookie-parser";
connection();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
adminRoutes(app);
userRoutes(app);
app.listen(port, () => {
  console.log(`The Server is runing on port http://localhost:${port}`);
});
