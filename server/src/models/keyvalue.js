import mongoose from "mongoose";

const KeyValueSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    required: true
  },
  value: {
    type: String,
    unique: false,
    required: true
  }
});

export default mongoose.model("KeyValue", KeyValueSchema);
