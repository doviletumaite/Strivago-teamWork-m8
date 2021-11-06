import mongoose from "mongoose";

const { Schema, model } = mongoose;

const accomodationSchema = new Schema({
  city: { type: String, required: true },
  description: { type: String, required: true },
  host: { type: Schema.ObjectId, ref: "User"},
  maxGuests: { type: Number, required: true },
  name: { type: String, required: true }
});

accomodationSchema.methods.toJSON = function () {
  const accomodationDocument = this;
  const accomodationObject = accomodationDocument.toObject();
  delete accomodationObject.__v;
  delete accomodationObject.host.password;
  delete accomodationObject.host.__v;
  return accomodationObject;
}

export default model("Accomodation", accomodationSchema);