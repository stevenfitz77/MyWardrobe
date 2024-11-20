import mongoose from "mongoose";

const clothingItemSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        type: { // Top or bottom
            type: String,
            required: true
        }
    },
    {
        timestamps: true // createdAt, updatedAt
    }
);

const ClothingItem = mongoose.model("ClothingItem", clothingItemSchema);

export default ClothingItem;