import csv from "csv-parser";
// import parse from "csv-parser";
import fs from "fs";

export const verify = (req, res) => {
  try {
    const file = req.file.filename;
    if (file) {
      let status = 0;
      fs.createReadStream("./uploads/" + file)
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
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
