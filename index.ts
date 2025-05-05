import express from "express";
import db from "./db";

const app = express();
const port = 3000;

app.use(express.json());

app.post('/keep-track-of-credit', async (req, res) => {

    const { project_name, user_name, version, credit_used } = req.body;

    if (!project_name || !user_name || !version || !credit_used) {
        res.status(429).json({ error: "Provide all the details" })
    }


    try {
        let collection = db.collection("d-id-credit-tracker");

        const newRecord = { project_name, user_name, version, credit_used, date: new Date() };
        await collection.insertOne(newRecord);

        let results = await collection.find({}).limit(50).toArray();

        res.status(200).json(results);
    } catch (error) {
        console.error("Error interacting with MongoDB:", error);
        res.status(500).json({ error: "Database operation failed" });
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
