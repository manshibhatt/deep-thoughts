import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();


router.delete("/events/:id", async (req, res) => {
    const eventId = req.params.id; 
    const client = req.app.locals.dbClient; 

    try {
        const database = client.db("dt"); 
        const collection = database.collection("events"); 

      
        const result = await collection.deleteOne({ _id: new ObjectId(eventId) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "Event not found" });
        }

        res.status(200).send({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting event", error: error.message });
    }
});

export default router;
