import { Router } from "express";
//controllers
import { getAll, increaseLikes } from "../controllers";

const router = Router();

router.get("/", getAll);
router.post("/:id/likes", increaseLikes);

export default router;
