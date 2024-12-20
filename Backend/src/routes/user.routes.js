import { Router } from "express";
import express from "express";
import { handleUserSignUp,handleUserLogin, logoutUser, getCurrentUser, changeCurrentPassword, 
    postDoubt,fetchData, submitAnswer, displayPerticularDoubt, vote, googleAuth } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.js"

const app = express();
const router = Router();

app.use(express.static('../'));
app.use('/api/v1/', router)

router.route("/googleLogin").get(googleAuth);
router.route("/my-account").get(verifyJWT, getCurrentUser);
router.route("/questions/:id").get(displayPerticularDoubt);
router.route("/fetchQueries").get(fetchData);

router.post('/signUp',handleUserSignUp);
router.post('/signIn', handleUserLogin);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/doubts").post(verifyJWT, postDoubt);
router.route("/submitAnswer").post(verifyJWT,submitAnswer);
router.route("/answers/vote").post(verifyJWT,vote);

export default router