import mongoose from "mongoose";

const { Schema, model } = mongoose;

const accomodationSchema = new Schema({
  name: { type: String, required: true },
  host: { type: Schema.Types.ObjectId, ref: "User"},
  description: { type: String, required: true },
  maxGuests: { type: Number, required: true },
  city: { type: String, required: true }
});

export default model("Accomodation", accomodationSchema);