import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";

import initKnex from "knex";
import configuration from "./knexfile.js";

const knex = initKnex(configuration);


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Store the file in memory as a buffer
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const { name } = req.body;
      const fileBuffer = req.file.buffer; // File data as a Buffer
      const fileName = req.file.originalname; // Original file name
  
      // Insert the file into the database
      await knex('users').insert({
        name: name,
        image: fileBuffer // Storing the file as a binary blob
      });
  
      res.status(200).json({ message: 'File uploaded successfully', fileName: fileName });
    } catch (error) {
      res.status(500).json({ message: 'File upload failed', error: error.message });
    }
  });

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
