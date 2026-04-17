import { Router } from 'express';
import createOrder from '../controllers/order';
import { validateOrderCreate } from '../middlewares/validators';

const router = Router();

router.post('/order', validateOrderCreate, createOrder);

export default router;
