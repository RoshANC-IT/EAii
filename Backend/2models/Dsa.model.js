import mongoose from "mongoose";

const DsaSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  subTopic: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const DSASchema = mongoose.model("DSA", DsaSchema);
export default DSASchema;
