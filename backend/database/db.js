import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "crud-mern";

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB");
    return client.db(dbName);
  } catch (err) {
    console.error("Error MongoDB:", err.message);
    process.exit(1);
  }
};

export const getDB = () => client.db(dbName);