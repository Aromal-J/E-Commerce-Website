const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { upload } = require("../multer");
const ErrorHandler = require("../Utils/ErrorHandler");
const path = require("path");
// const { fileURLToPath } = require("url");
// const CatchAsyncError = require("../Middleware/CatchAsyncError");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../Utils/sendMail");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const {  name, email, password } = req.body;
     
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const fileName = req.file.filename;
      const filePath = `uploads/${fileName}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error Deleting file" });
        } else {
          res.json({ message: "File deleted successfully" });
        }
      });
      return next(new ErrorHandler("User already exists ", 400));
    }

    const fileName = req.file.filename;
    // console.log(fileName);
    const fileUrl = path.join(fileName);
    // console.log(fileUrl);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: fileUrl,
        url: fileUrl,
      },
    };
    const activationToken = createActivationToken(user);
    // console.log(activationToken);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    // console.log(activationUrl);

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your Account",
        message: `Hello ${user.name} Please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(err.message), 500);
    }

   

    // res.status(201).json({ success: true, newUser });
  } catch (error) {
    return next(new ErrorHandler(error.message), 400);
  }
});

 //function to create activation token
 const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

module.exports = router;
