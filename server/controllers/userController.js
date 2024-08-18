import "dotenv/config";
import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);


const createUser = async (req, res) => {
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
}

const getAllUsers = async (req, res) => {
  
    try {
      const users = await knex('users');
  
      if (!users) {
        return res.status(404).send('User not found');
      }
  
      const userData = users.map(user => {
        // Convert image to Base64
        const imageBase64 = user.image ? user.image.toString('base64') : null;
        
        // Create a combined response with user data and image in Base64
        return {
            id: user.id,
            name: user.name,
            image: imageBase64,
            created_at: user.created_at,
            updated_at: user.updated_at
        };
      })

      res.json(userData);
  
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Server error');
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await knex('users').where({ id }).first();
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Convert image to Base64
      const imageBase64 = user.image ? user.image.toString('base64') : null;
  
      // Create a combined response with user data and image in Base64
      const userData = {
        id: user.id,
        name: user.name,
        image: imageBase64,
        created_at: user.created_at,
        updated_at: user.updated_at
      };
  
      res.json(userData);
  
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Server error');
    }
}

export { createUser, getAllUsers, getUserById }