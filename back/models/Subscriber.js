import mongoose from "mongoose"

const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "subscribed"], default: "pending" }
},
{ timestamps: true}
);


export default mongoose.model("Subscriber", subscriberSchema);
