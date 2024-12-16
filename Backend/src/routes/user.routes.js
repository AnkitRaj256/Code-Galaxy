import { Router } from "express";
import express from "express";
import { handleUserSignUp,handleUserLogin, logoutUser, getCurrentUser, changeCurrentPassword, postDoubt,fetchData, submitAnswer, displayPerticularDoubt } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.js"
import { get } from "mongoose";

const app = express();
const router = Router();

app.use(express.static('../'));
app.use('/api/v1/', router)

router.post('/signUp',handleUserSignUp);
router.post('/signIn', handleUserLogin);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/my-account").get(verifyJWT, getCurrentUser);
router.route("/doubts").post(verifyJWT, postDoubt);
router.route("/fetchQueries").get(fetchData);
router.route("/questions/:id").get(displayPerticularDoubt);

export default router