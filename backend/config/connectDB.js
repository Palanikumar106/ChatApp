const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://palani106104:123@cluster-chat.vmg1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-chat"
      )
      .then((con) => {
        console.log("connect to " + con.connection.host);
      });
  } catch (err) {
    console.log(err);
  }
}
module.exports = connectDB;
