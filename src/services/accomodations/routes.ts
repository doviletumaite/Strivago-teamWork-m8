import express from "express";
import createHttpError from "http-errors";
import { HostOnly } from "../../midllewares/auth/HostOnly.js";
import accomodationModel from "./schema.js";
import { tokenAuthMiddleware } from "../../midllewares/auth/tokenMiddleware.js";

const accomodationsRouter = express.Router();

accomodationsRouter.post("/register", tokenAuthMiddleware, HostOnly, async (req, res, next) => {
  try {
    const newAccomodation = new accomodationModel(req.body);
    const saveAccomodation = await newAccomodation.save();
    res.send(saveAccomodation);
  } catch (error) {
    next(error);
  }
});

// return FULL LIST of accommodations
accomodationsRouter.get("/", tokenAuthMiddleware, async (req, res, next) => {
    try {
        const accomodations = await accomodationModel.find().populate('host');
        res.send(accomodations);
    } catch (error) {
      next(error);
    }
  }
);

accomodationsRouter.get("/:accomodationId", tokenAuthMiddleware, async (req, res, next) => {
  try {
    const accomodation = await accomodationModel.findById(req.params.accomodationId).populate('host');
      if(accomodation){
        console.log(accomodation)
        res.send(accomodation);
      } else {
        next(createHttpError(404, "Accomodation not found!"))
      }
  } catch (error) {
    next(error);
  }
}
);

accomodationsRouter.put("/:accomodationId", tokenAuthMiddleware, HostOnly, async (req, res, next) => {
  try {
    const editedAccomodation = await accomodationModel.findByIdAndUpdate(
      req.params.accomodationId,
      req.body,
      {new: true}
    )
    // .populate('host');
      if(editedAccomodation) {
        res.status(200).send(editedAccomodation);
      } else {
        next(createHttpError(404, "Accomodation not found!"))
      }
  } catch (error) {
    next(error);
  }
}
);

accomodationsRouter.delete("/:accomodationId", tokenAuthMiddleware, HostOnly, async (req, res, next) => {
  try {
    const deleteAccomodation = await accomodationModel.findByIdAndDelete(
      req.params.accomodationId
    );
    if(deleteAccomodation) {
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
