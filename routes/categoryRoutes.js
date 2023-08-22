import express from 'express';
import { createCategoryController, updateCategoryController } from '../controller/categoryController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";


const router  = express.Router()

router.post('/create-category',
 requireSignIn,
isAdmin,
createCategoryController)

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

export default router;