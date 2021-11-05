import express from "express";
import createHttpError from "http-errors";
import { HostOnly } from "../../midllewares/hostOnly.js";
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

accomodationsRouter.get("/:accomodationId", tokenAuthMiddleware, async (req, res, next) => {
  try {
      const accomodation = await accomodationModel.findById({_id: req.params.accomodationId});
      res.send(accomodation);
  } catch (error) {
    next(error);
  }
}
);


export default accomodationsRouter;
