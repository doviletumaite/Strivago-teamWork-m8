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
    const accomodationId = req.params.accomodationId
    const accomodation = await accomodationModel.findById({accomodationId});
      if(accomodation){
        console.log(accomodation)
        res.send(accomodation);
      } else {
        console.log("NOOOO")
        next(error)
      }
  } catch (error) {
    next(error);
  }
}
);

accomodationsRouter.put("/:accomodationId", tokenAuthMiddleware, async (req, res, next) => {
  try {
    const accomodationId = req.params.accomodationId
    const accomodation = await accomodationModel.findByIdAndUpdate(
      {_id: accomodationId},
      req.body,
      {new: true}
    );
      if(accomodation) {
        res.status(200).send(accomodation);
      } else {
        next(createHttpError(404, "Accomodation not found!"))
      }
  } catch (error) {
    next(error);
  }
}
);

accomodationsRouter.delete("/:accomodationId", tokenAuthMiddleware, async (req, res, next) => {
  try {
    const accomodationId = req.params.accomodationId
    const accomodation = await accomodationModel.findByIdAndDelete(
      {_id: accomodationId}
    );
    if(accomodation) {
      res.status(204).send("Deleted!");
    } else {
      next(createHttpError(404, "Accomodation not found!"))
    }
  } catch (error) {
    next(error);
  }
}
);


export default accomodationsRouter;
