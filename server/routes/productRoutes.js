import express from "express";
import formidable from "express-formidable";
import {
    brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    getProducts,
    getProductsBySlug,
    productCategoryController,
    productCountController,
    productDeleteController,
    productFiltersController,
    productListController,
    productPhotoController,
    productUpdateController,
    realtedProductController,
    searchProductController,
} from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    productUpdateController
);

router.get("/products", getProducts);

router.get("/get-product/:slug", getProductsBySlug);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", productDeleteController);

router.post("/product-filters/", productFiltersController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
