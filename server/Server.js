const app = require("./App");
const connectDatabase = require("./DB/DataBase");

//Handling uncaught error

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log(err.message);
  console.log("Shutting down the server for handling uncaught error");
});

// uncaught promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`shutting down the server for ${err.message}`);
  console.log('shutting down the server for uncaught promise rejection');
  server.close(() => {
    process.exit(1);
  });
});

//Config

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "Config/.env",
  });
}

// Connect DataBase

connectDatabase();

//Create Port
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening to ${process.env.PORT}`);
});
