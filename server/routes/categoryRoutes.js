import express from 'express';
import { createCategoryController, deleteCategoryById, getCategories, getCategoryBySlug, updateCategoryController } from '../controller/categoryController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";


const router  = express.Router()

router.post('/create-category',
 requireSignIn,
isAdmin,
createCategoryController)

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

router.get('/categories', getCategories)

router.get('/single-category/:slug', getCategoryBySlug)

router.delete('/delete-category/:id',requireSignIn,isAdmin, deleteCategoryById)

export default router;