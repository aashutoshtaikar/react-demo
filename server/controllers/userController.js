import "dotenv/config";
import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);


const createUser = async (req, res) => {
    try {
        const { name } = req.body;
        const fileBuffer = req.file.buffer; // File data as a Buffer
        const fileName = req.file.originalname; // Original file name
        const splitFileName = fileName.toString().split(".");
        const fileType = splitFileName[splitFileName.length-1];

        // Insert the file into the database
        await knex('users').insert({
          name: name,
          image: fileBuffer, // Storing the file as a binary blob
          image_type: fileType
        });
    
        res.status(200).json({ message: 'File uploaded successfully', fileName: fileName });
      } catch (error) {
        res.status(500).json({ message: 'File upload failed', error: error.message });
      }
}

const getAllUsers = async (req, res) => {
  
    try {
      const users = await knex('users')
        .select(
          "users.id",
          "users.name"
        );
  
      if (!users) {
        return res.status(404).send('User not found');
      }

      res.json(users);
  
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Server error');
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await knex('users')
        .select(
          "users.id",
          "users.name"
        )
        .where({ id })
        .first();
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      res.json(userData);
  
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Server error');
    }
}

const getImageByUserId = async(req, res) => {
  const { id } = req.params;
  
    try {
      const user = await knex('users').where({ id }).first();
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      let imageData = null;
      if (user.image) {
        const imageBase64 = user.image ? user.image.toString('base64') : null;
      
        imageData = {
          image: imageBase64,
          image_type: user.image_type
        }  
      }
      
      res.json(imageData);
  
    } catch (error) {
      console.error('Error fetching user image data:', error);
      res.status(500).send('Server error');
    }
}

export { createUser, getAllUsers, getUserById, getImageByUserId }