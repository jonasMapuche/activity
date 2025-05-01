import express from 'express';
const router = express.Router();
import { Controller } from "../controllers/controller";
router.get('/', Controller.hello_seminar);
router.get('/all', Controller.getAll_seminar);
router.get('/framework/:id', Controller.getFramework_seminar);
router.get('/name/:id', Controller.getName_seminar);
router.post('/', Controller.save_seminar);
module.exports = router;