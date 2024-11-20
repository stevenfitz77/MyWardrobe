import express from "express";
import { createClothingItem, deleteClothingItem, getClothingItems, updateClothingItem } from "../controllers/clothingItemController.js";

const router = express.Router();

router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.put("/:id", updateClothingItem);
router.delete("/:id", deleteClothingItem);

export default router;