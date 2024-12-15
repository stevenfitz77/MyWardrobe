import express from 'express';
import { saveOutfit, getOutfits, deleteOutfit } from '../controllers/outfitController.js';

const router = express.Router();

router.post('/', saveOutfit);
router.get('/', getOutfits);
router.delete('/:id', deleteOutfit)

export default router;