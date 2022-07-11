import {
  admin,
  adminLogin,
} from "../../controllers/admins/admin.controller.js";
import {
  editUser,
  getUser,
  updateUser,
} from "../../controllers/admins/user.controller.js";
import { adminMiddleware } from "../../middleware/admin.middleware.js";

export default (app) => {
  app.post("/admin/login", adminLogin);
  app.get("/admin", adminMiddleware, admin);
  app.get("/admin/users", adminMiddleware, getUser);
  app.patch("/admin/edit/users/:id", adminMiddleware, editUser);
  app.put("/admin/update/users/:id", adminMiddleware, updateUser);
};
