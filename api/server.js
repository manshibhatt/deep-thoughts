import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import eventRoutes from "./routes/post.js";
import getRoutes from "./routes/get.js";
import getQueryRoutes from "./routes/getquery.js";
import put from "./routes/put.js"
import deleted from "./routes/delete.js"
import dotenv from "dotenv";

const app = express();

dotenv.config(); 
 

// const uri = ;


const client = new MongoClient(process.env.MONGO, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function connectToDatabase() {
  try {
   
    await client.connect();
    console.log("Connected to MongoDB!");

    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}


connectToDatabase();


app.use(express.json());


app.locals.dbClient = client;


app.use("/api/v3/app", eventRoutes);
app.use("/api/v3/app", getRoutes);
app.use("/api/v3/app", getQueryRoutes);
app.use("/api/v3/app", put);
app.use("/api/v3/app", deleted);


const PORT = process.env.PORT || 8800; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
