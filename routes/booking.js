import express from 'express';
import { bookticket, getbooking, history } from '../controllers/booking.js';
// import { getEvent, getEvents } from '../controllers/event.js';

const router= express.Router();


router.post('/',bookticket);
router.get('/mybooking/:id',getbooking);
router.get('/history/:id', history);
export default router;