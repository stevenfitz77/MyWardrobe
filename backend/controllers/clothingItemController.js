import ClothingItem from "../models/clothingItem.js";
import mongoose from "mongoose";

export const getClothingItems = async (req, res) => {
    try {
        const clothingItems = await ClothingItem.find({}); //passing empty object tells it to get all items
        res.status(200).json({ success: true, data: clothingItems });
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createClothingItem = async (req, res) => {
    const { brand, color, size, type } = req.body; // user sends this data
    const image = req.file.filename;

    if (!brand || !color || !size || !image) {
        return res.status(400).json({ success:false, message: "Please provide all required fields" });
    }

    const newClothingItem = new ClothingItem({ brand, color, size, image, type });

    try {
        await newClothingItem.save();
        res.status(201).json({success: true, data: newClothingItem});
    } catch (error) {
        console.error("Error creating clothing item:", error.message);
        res.status(500).json({ scucess: false, message: "Server Error"});
    }
};

export const updateClothingItem = async (req, res) => {
    const { id } = req.params;
    const clothingItem = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product with that id not found" });
    }
    
    try {
        const updatedClothingItem = await ClothingItem.findByIdAndUpdate(id, clothingItem, { new:true });
        res.status(200).json({ success: true, data: updatedClothingItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteClothingItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        await ClothingItem.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Clothing item deleted" });
    } catch (error) {
        console.log("Error deleting clothing item:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};