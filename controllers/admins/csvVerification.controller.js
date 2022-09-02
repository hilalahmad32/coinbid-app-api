import csv from "csv-parser";
// import parse from "csv-parser";
import fs from "fs";
export const verify = (req, res) => {
  try {
    if (req.files) {
      let status = 0;
      fs.createReadStream(req.files.file.tempFilePath)
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
          return res.send({
            success: true,
            message: "Verfied successfully",
          });
        });
    } else {
      return res.send({
        success: false,
        message: "Please upload csv file",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
  // try {
  //   const file = req.file;
  //   if (req.file != null) {
  //     const filename = file.filename;
  //     let status = 0;
  //     fs.createReadStream(filename)
  //       .pipe(csv())
  //       .on("data", (row) => {
  //         if (row == "pending") {
  //           return res.send({
  //             success: false,
  //             message: "Not verified",
  //           });
  //         }
  //       })
  //       .on("end", () => {
  //         return res.send({
  //           success: true,
  //           message: "Verified Successfully",
  //         });
  //       });
  //   } else {
  //     return res.send({
  //       success: false,
  //       message: "Please Upload csv file",
  //     });
  //   }
  // } catch (error) {
  //   return res.send({
  //     success: false,
  //     message: error.message,
  //   });
  // }
};
