"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var accomodationSchema = new Schema({
    city: { type: String, required: true },
    description: { type: String, required: true },
    host: { type: Schema.ObjectId, ref: "User" },
    maxGuests: { type: Number, required: true },
    name: { type: String, required: true }
});
accomodationSchema.methods.toJSON = function () {
    var accomodationDocument = this;
    var accomodationObject = accomodationDocument.toObject();
    delete accomodationObject.__v;
    delete accomodationObject.host.password;
    delete accomodationObject.host.__v;
    return accomodationObject;
};
exports.default = model("Accomodation", accomodationSchema);
