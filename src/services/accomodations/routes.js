import express from "express";
import createHttpError from "http-errors";
import accomodationModel from "../accomodations/schema.js";
import { tokenAuthMiddleware } from "../../midllewares/tokenMiddleware.js";

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

// return FULL LIST of accommodations
accomodationsRouter.get("/", tokenAuthMiddleware, async (req, res, next) => {
    try {
        const accomodations = await accomodationModel.find();
        res.send(accomodations);
    } catch (error) {
      next(error);
    }
  }
);

export default accomodationsRouter;
