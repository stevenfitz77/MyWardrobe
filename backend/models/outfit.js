import mongoose from 'mongoose';

const outfitSchema = mongoose.Schema({
    top: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClothingItem',
        required: true
    },
    bottom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClothingItem',
        required: true
    }
});

const Outfit = mongoose.model('Outfit', outfitSchema);

export default Outfit;