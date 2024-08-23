import express from "express";
import * as userController from "../controllers/userController.js";
import multer from "multer";

const router = express.Router()

// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Store the file in memory as a buffer
const upload = multer({ storage: storage });

router
    .route("/users")
    .get(userController.getAllUsers)
    .post(upload.single('image'), userController.createUser)

router
    .route("/users/:id")
    .get(userController.getUserById)

router
    .route("/users/images/:id")
    .get(userController.getImageByUserId)


export default router;