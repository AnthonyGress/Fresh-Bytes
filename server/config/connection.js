const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/freshbytes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
