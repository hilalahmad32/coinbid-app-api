import csv from "csv-parser";
// import parse from "csv-parser";
import fs from "fs";

export const verify = (req, res) => {
  try {
    const file = req.files.file;
    cloudinary.v2.uploader.upload(file.tempFilePath, async (err, result) => {
      if (file) {
        let status = 0;
        fs.createReadStream(result.url)
          .pipe(csv())
          .on("data", (row) => {
            if (row == "pending") {
              return res.send({
                success: false,
                message: "Not verified",
              });
            }
          })
          .on("end", () => {
            console.log("success");
          });
      }
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
