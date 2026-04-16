import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/product';
import { validateProductCreate } from '../middlewares/validators';

const router = Router();

router.get('/product', getProducts);
router.post('/product', validateProductCreate, createProduct);

export default router;