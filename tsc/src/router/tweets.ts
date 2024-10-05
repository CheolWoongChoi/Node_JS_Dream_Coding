import express from "express";
import * as tweetsController from "../controller/tweets";

const router = express.Router();

router.get("/", tweetsController.getTweets);

export default router;
