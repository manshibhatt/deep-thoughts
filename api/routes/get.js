import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
const router = express.Router();
import { ObjectId } from "mongodb";

router.get("/events/:id", async (req, res) => {
    const eventId = req.params.id; 
    const client = req.app.locals.dbClient; 
  
    try {
     
      const database = client.db("dt"); 
      const collection = database.collection("events"); 
  
     
      const event = await collection.findOne({ _id: new ObjectId(eventId) });
  
      if (event) {
        res.status(200).send(event);
      } else {
        res.status(404).send({ message: "Event not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error fetching event", error: error.message });
    }
  });
  

export default router;
