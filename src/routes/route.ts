import express from "express";
import addSchool from "../controllers/addSchool";
import getSchool from "../controllers/getSchool";
const router = express.Router();

router.post("/addSchool", addSchool);

router.get("/listSchools", getSchool);

export default router;
