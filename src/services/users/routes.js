import express from "express";
import createHttpError from "http-errors";
import userModel from "../users/schema.js";

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new userModel(req.body);
    const { _id } = await newUser.save();
    res.send({ _id });
  } catch (error) {
    next(error);
  }
});

usersRouter.get(
  "/:userId",
  async (req, res, next) => {
    try {
        const user = await userModel.findById({_id: req.params.userId}).populate({path: 'accomodations', select: "name"})
        res.send(user)
    } catch (error) {
      next(error);
    }
  }
);

export default usersRouter;
