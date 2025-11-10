import { Router } from "express";
import qrRoutes from "./qrRoutes";

const router = Router();


router.use("/qr", qrRoutes);

export default router;
