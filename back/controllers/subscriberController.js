import Subscriber from "../models/Subscriber.js"
import validator from "validator";
import { sendConfirmationEmail } from "../utils/emailService.js";

// Subscribe user (POST /subscribe)
export const subscribeUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email){
            return res.status(400).json({ message: "Email is required" });}

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        const existingSubscriber = await Subscriber.findOne({ email }).lean();
        if (existingSubscriber) {
            return res.status(400).json({ message: "Already subscribed" });
        }
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        await sendConfirmationEmail(email);
        res.status(201).json({ message: "Subscription pending. Confirm via email." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Confirm subscription (GET /confirm/:email)
export const confirmSubscription = async (req, res) => {
    try {
        const { email } = req.params;
        const sub = await Subscriber.find({email});
        if (sub.status === "subscribed"){
            res.status(404).json({ message: "already confirmed" });
        }
        const subscriber = await Subscriber.findOneAndUpdate(
            { email },
            { status: "subscribed" },
            { new: true }
        );

        if (!subscriber) {
            return res.status(404).json({ message: "Subscriber not found" });
        }
        res.status(200).json({ message: "Subscription confirmed", subscriber });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Confirm subscription stuatus (GET /status/:email)
export const confirmStatus = async (req, res) => {
    try {
        const { email } = req.params;
        const subscriber = await Subscriber.findOne({ email });

        if (!subscriber) return res.status(404).json({ message: "Subscriber not found" });

        res.json({ status: subscriber.status }); // "pending" or "subscribed"

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all subscribers (GET /subscribers)
export const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
