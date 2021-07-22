const mongoose = require("mongoose");

module.exports = async () => {
  try {
    let mongoString = process.env.MONGO_STRING || "http://localhost:27017";
    const switchToLocal = true;
    mongoString = switchToLocal ? process.env.MONGO_lOCAL_STRING : mongoString;

    const conn = await mongoose.connect(mongoString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
