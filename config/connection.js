const mongoose = require("mongoose");
// connecting server to mongoose and processing enviornment

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/social-network-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

mongoose.set("debug", true);

module.exports = mongoose.connection;
