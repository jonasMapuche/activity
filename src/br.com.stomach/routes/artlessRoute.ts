import express from 'express';
const router = express.Router();
import { Controller } from "../controllers/controller";
router.get('/', Controller.hello_history);
router.get('/all', Controller.getAll_history);
router.get('/name/:id', Controller.getName_history);
router.post('/range', Controller.postRange_history);
router.post('/', Controller.save_history);
module.exports = router;