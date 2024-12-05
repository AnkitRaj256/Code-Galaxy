import { Router } from "express";
import express from "express";
import { handleUserSignUp,handleUserLogin, logoutUser, getCurrentUser, changeCurrentPassword, postDoubt,fetchData, submitAnswer } from "../controllers/user.controller.js";

const app = express();
const router = Router();

app.use(express.static('../'));
app.use('/api/v2/', router)

router.post('/signUp',handleUserSignUp);

export default router