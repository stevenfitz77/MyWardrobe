import Outfit from '../models/outfit.js';
import mongoose from 'mongoose';

export const saveOutfit = async (req, res) => {
    const { top, bottom } = req.body;
    const newOutfit = new Outfit({ top, bottom });

    try {
        await newOutfit.save();
        res.status(201).json({ success: true, data: newOutfit });
    } catch (error) {
        console.error("Error saving outfit:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getOutfits = async (req, res) => {
    try {
        const outfits = await Outfit.find({}).populate('top').populate('bottom');
        res.status(200).json({ success: true, data: outfits });
    } catch (error) {
        console.error("Error fetching outfits:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteOutfit = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Outfit Id" });
    }

    try {
        await Outfit.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Outfit deleted" });
    } catch (error) {
        console.error("Error deleting outfit:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};