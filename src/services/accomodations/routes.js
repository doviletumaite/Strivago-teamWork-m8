import express from "express";
import createHttpError from "http-errors";
import { HostOnly } from "../../midllewares/hostOnly.js";
import accomodationModel from "../accomodations/schema.js";

const accomodationsRouter = express.Router();

accomodationsRouter.post("/register", async (req, res, next) => {
  try {
    const accomodation = new accomodationModel(req.body);
    const newAccomodation = await accomodation.save();
    res.send(newAccomodation);
  } catch (error) {
    next(error);
  }
});

accomodationsRouter.get(
  "/", HostOnly,
  async (req, res, next) => {
    try {
      const accomodations = await accomodationModel.find();
      res.send(accomodations);
    } catch (error) {
      next(error);
    }
  }
);

export default accomodationsRouter;
