import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@crud-app.no61mig.mongodb.net/?retryWrites=true&w=majority`;
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error while connecting with database", error);
  }
};

export default Connection;

//`mongodb://${username}:${password}@ac-91cypuw-shard-00-00.no61mig.mongodb.net:27017,ac-91cypuw-shard-00-01.no61mig.mongodb.net:27017,ac-91cypuw-shard-00-02.no61mig.mongodb.net:27017/?ssl=true&replicaSet=atlas-ige7f4-shard-0&authSource=admin&retryWrites=true&w=majority`;
