import jwt from "jsonwebtoken";

export const adminMiddleware = (req, res, next) => {
  try {
    const token = req.headers.admin_access_token;
    if (!token) {
      return res.send({
        succes: false,
        message: "unAuthorized",
      });
    }

    try {
      const { admin_id } = jwt.verify(
        token,
        "HILALAHMADISAFULLSTACKDEVELOPER",
      );
      req.admin_id = admin_id;
    } catch (err) {
      return res.send({
        succes: false,
        message: "unAuthorized",
      });
    }
  } catch (err) {
    return res.send({
      succes: false,
      message: "unAuthorized",
    });
  }
  next();
};
