import express from 'express';
import formidable from 'express-formidable';
import { createProductController, getProducts, getProductsBySlug, productDeleteController, productPhotoController, productUpdateController } from '../controller/productController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';

const router  = express.Router()

router.post('/create-product',
 requireSignIn,
isAdmin,
formidable(),
createProductController);

router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(), productUpdateController)


router.get("/products", getProducts)

router.get("/get-product/:slug", getProductsBySlug)

router.get("/product-photo/:pid", productPhotoController)

router.delete("/delete-product/:pid", productDeleteController)


export default router;