import { Router } from "express";
import { uploadData, fetchData, deletePost, getPostById } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/uploadData',upload.single("image"), uploadData)
router.delete('/delete/:postId', deletePost);
router.get('/fetchData', fetchData)
router.get('/getPostById/:postId', getPostById);



export default router;