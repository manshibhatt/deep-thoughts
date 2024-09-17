import express from "express";

const router = express.Router();


router.post("/events", async (req, res) => {
  const eventData = req.body; 
  const client = req.app.locals.dbClient;

  try {
    
    const database = client.db("dt"); 
    const collection = database.collection("events"); 

    const result = await collection.insertOne(eventData);
    res.status(201).send({ message: "Event created", eventId: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: "Error creating event", error: error.message });
  }
});

export default router;
