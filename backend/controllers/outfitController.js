import Outfit from '../models/outfit.js';

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