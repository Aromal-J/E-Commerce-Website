const moongoose = require("mongoose");

const connectDatabase = () => {
  moongoose.connect(process.env.MONGO_URI, {}).then((data) => {
    console.log(`MongoDB connect with server: ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
