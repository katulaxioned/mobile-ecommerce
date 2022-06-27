require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(`mongodb+srv://Atul:${process.env.DB_USER_PASSWORD}@mobile-store.y8wmesj.mongodb.net/test`);
  } catch (err) {
    console.log(`Database connection failed due to this err: ${err}`)
    process.exit();
  }
}

module.exports = connectDB;