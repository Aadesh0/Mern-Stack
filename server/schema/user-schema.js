import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const userSchema = mongoose.Schema({
  Name: String,
  DOB: String,
  Email: String,
  Address: String,
  File: String,
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, "user");

const user = mongoose.model("user", userSchema);

export default user;
