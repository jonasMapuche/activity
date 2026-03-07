import express from 'express';
const router = express.Router();
import { Controller } from "../controllers/controller";
router.get('/', Controller.hello_physical);
router.get('/all', Controller.getAll_physical);
router.get('/framework/:id', Controller.getFramework_physical);
router.get('/name/:id', Controller.getName_physical);
router.post('/', Controller.save_physical);
module.exports = router;