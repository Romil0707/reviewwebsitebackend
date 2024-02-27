import { Router } from "express";
import { uploadData, fetchData } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/uploadData',upload.single("image"), uploadData)
router.get('/fetchData', fetchData)


export default router;