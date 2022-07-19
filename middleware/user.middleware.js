import jwt from "jsonwebtoken";

export const userMiddleware = (req, res, next) => {
  try {
    const token = req.headers.user_access_token;
    if (!token) {
      return res.send({
        succes: false,
        message: "unAuthorized",
      });
    }

    try {
      const { user_id } = jwt.verify(
        token,
        "HILALAHMADISAFULLSTACKDEVELOPER",
      );
      req.user_id = user_id;
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
