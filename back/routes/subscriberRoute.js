import  express from "express";
import { subscribeUser, confirmSubscription, getSubscribers, confirmStatus } from "../controllers/subscriberController.js";

const router = express.Router();

router.post("/subscribe", subscribeUser);
router.get("/confirm/:email", confirmSubscription);
router.get("/subscribers", getSubscribers);
router.get("/status/:email", confirmStatus);

export default router;
