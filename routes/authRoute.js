import express from "express";
import { forgotPasswordController, loginController, registerController, testController } from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/register",registerController);
router.post("/login",loginController); 

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

router.get("/test", requireSignIn,isAdmin,testController)

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

//protected admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

export default router;