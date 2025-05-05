import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://erp-database:95Bho24XCwTQNHyx@erp-system.p7vyn.mongodb.net/erpDB?retryWrites=true&w=majority&appName=erp-system";
const client = new MongoClient(connectionString);
let conn;

try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
    process.exit(1);
}

let db = conn && conn.db("ai-platform");

export default db;