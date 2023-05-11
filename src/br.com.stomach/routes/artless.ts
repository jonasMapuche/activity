import express from 'express';
const router = express.Router();
import { Controller } from "../controllers/controller";
router.get('/', Controller.hello_history);
router.get('/all', Controller.getAll_history);
router.post('/', Controller.save_history);
module.exports = router;