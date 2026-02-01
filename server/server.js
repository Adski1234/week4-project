import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import pg from "pg"

const app = express();

app.use(express.json());

dotenv.config();

app.use(cors());

const db = new pg.Pool({
    connectionString: process.env.DB_CONN
});

app.get("/wall", async(req, res) => {
    try {
        const result = await db.query("SELECT * FROM wall ORDER BY id DESC;");
        res.status(200).json(result.rows);
    }   catch (error) {
        console.log(error);
        res.status(500).json({error: "Database error"});
    }
});

app.post("/wall", async (req, res) => {
    try {
        const { wall_name, year } = req.body;

        if (!wall_name || !year) {
            return res.status(400).json({ error: "wall_name and year are required"});
        }
    
        const result = await db.query(
          "INSERT INTO wall (wall_name, year) VALUES ($1, $2) RETURNING *;",
          [wall_name, year] 
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Databae error"})
    }
    });



const PORT = process.env.PORT || 9010;
app.listen(9010, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})