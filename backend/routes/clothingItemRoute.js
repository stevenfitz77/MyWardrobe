import express from "express";
import multer from 'multer';
import { createClothingItem, deleteClothingItem, getClothingItems, updateClothingItem } from "../controllers/clothingItemController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.get("/", getClothingItems);
router.post("/", upload.single('image'), createClothingItem);
router.put("/:id", updateClothingItem);
router.delete("/:id", deleteClothingItem);

export default router;