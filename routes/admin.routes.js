import { admin, adminLogin } from "../controllers/admin.controller.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

export default (app) => {
  app.post("/admin/login", adminLogin);
  app.get("/admin", adminMiddleware, admin);
};
