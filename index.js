import express from "express";
// import { config } from "dotenv";
// config();
import passport from "passport";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;
import adminRoutes from "./routes/admins/admin.routes.js";
import userRoutes from "./routes/users/user.routes.js";
import connection from "./connection/config.js";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import session from "express-session";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
connection();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(session({ secret: "melody hensley is my spirit animal",option :true,saveUninitialized:true }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload({
  useTempFiles: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads/", express.static("uploads/"));
app.use(express.static("public"));
app.use(cors());
cloudinary.config({
  cloud_name: "dvmhlno5n",
  api_key: "916244865956489",
  api_secret: "x9qM_IRjG0eEjQHgC_5JwTeMP5k",
});

adminRoutes(app);
userRoutes(app);
app.listen(port, () => {
  console.log(`The Server is runing on port http://localhost:${port}`);
});
