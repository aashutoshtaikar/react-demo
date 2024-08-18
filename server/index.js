import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoute)


// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//       const { name } = req.body;
//       const fileBuffer = req.file.buffer; // File data as a Buffer
//       const fileName = req.file.originalname; // Original file name
  
//       // Insert the file into the database
//       await knex('users').insert({
//         name: name,
//         image: fileBuffer // Storing the file as a binary blob
//       });
  
//       res.status(200).json({ message: 'File uploaded successfully', fileName: fileName });
//     } catch (error) {
//       res.status(500).json({ message: 'File upload failed', error: error.message });
//     }
//   });

  app.get('/images/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await knex('users').where({ id }).first();
  
      if (!user || !user.image) {
        return res.status(404).send('Image not found');
      }
  
      res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type based on your image format
      res.send(user.image);
  
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).send('Server error');
    }
  });

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
