const ErrorHandler = require("../Utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found with this id... Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong jwt
  if (err.name === "JsonWebTokenError") {
    const message = `Your URI is `;
  }
};
