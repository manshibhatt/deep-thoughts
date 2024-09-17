import express from "express";

const router = express.Router();


router.get("/events", async (req, res) => {
    const client = req.app.locals.dbClient; 

    
    const { type, limit = 10, page = 1 } = req.query;

   
    const limitNumber = parseInt(limit, 10);
    const pageNumber = parseInt(page, 10);

   
    if (isNaN(limitNumber) || limitNumber <= 0) {
        return res.status(400).send({ message: "Invalid limit value" });
    }
    if (isNaN(pageNumber) || pageNumber <= 0) {
        return res.status(400).send({ message: "Invalid page value" });
    }

    try {
      
        const database = client.db("dt"); 
        const collection = database.collection("events");

        
        const query = {};
        if (type) {
            query.type = type;
        }

        const events = await collection.find(query)
            .skip((pageNumber - 1) * limitNumber) 
            .limit(limitNumber) 
            .toArray();

       
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send({ message: "Error fetching events", error: error.message });
    }
});

export default router;
