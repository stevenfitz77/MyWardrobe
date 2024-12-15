import express from 'express';
import { saveOutfit, getOutfits } from '../controllers/outfitController.js';

const router = express.Router();

router.post('/', saveOutfit);
router.get('/', getOutfits);

export default router;