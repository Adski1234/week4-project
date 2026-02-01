import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import pg from "pg"

const app = express()

app.use(express.json())

dotenv.config()

app.use(cors())

const db = new pg.Pool({
    connectionString: process.env.DB_CONN
})

app.get('/wall', async(req, res) => {
    try {
        const result = await db.query("SELECT * FROM wall ORDER BY id DESC;");
        res.status(200).json(result.rows)
    }   catch (error) {
        console.log(error);
        res.status(500).json({error: "Database error"});
    }
});


app.listen(9010, () => {
    console.log('Server started on http://localhost:9010')
})