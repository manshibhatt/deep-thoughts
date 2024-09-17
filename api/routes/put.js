import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

router.put("/events/:id", async (req, res) => {
    const eventId = req.params.id; 
    const updatedData = req.body; 
    const client = req.app.locals.dbClient; 

    try {
        const database = client.db("dt"); 
        const collection = database.collection("events"); 

      
        const result = await collection.updateOne(
            { _id: new ObjectId(eventId) }, 
            { $set: updatedData } 
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({ message: "Event not found" });
        }

        res.status(200).send({ message: "Event updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error updating event", error: error.message });
    }
});

export default router;
