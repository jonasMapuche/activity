import express from 'express';
const router = express.Router();
import { Controller } from "../controllers/controller";
router.get('/', Controller.hello_sport);
router.get('/all', Controller.getAll_sport);
router.post('/', Controller.save_sport);
module.exports = router;