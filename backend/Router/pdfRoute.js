import express from "express";
import { pdfDownload } from "../Controller/pdfService.js";

const router = express.Router();

router.post('/generate-leave-application', pdfDownload);

export default router;