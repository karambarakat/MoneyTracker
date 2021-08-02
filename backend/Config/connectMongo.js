const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoString = process.env.MONGO_LOCAL_STRING || process.env.MONGO_STRING;

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
