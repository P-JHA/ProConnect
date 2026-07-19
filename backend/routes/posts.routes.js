import { Router } from "express";



const router = Router();

router.route("/").get(activeCheck); 

export default router;