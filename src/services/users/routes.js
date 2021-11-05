import express from "express";
import createHttpError from "http-errors";
import userModel from "../users/schema.js";
import accomodationModel from "../accomodations/schema.js";
import { tokenAuthMiddleware } from "../../midllewares/tokenMiddleware.js";
import { generateToken } from "../../midllewares/auth/tokenAuth.js";
import { HostOnly } from "../../midllewares/hostOnly.js";


const usersRouter = express.Router();

usersRouter.get("/me", tokenAuthMiddleware, async (req, res, next) => {
  try {
      res.send(req.user);
  } catch (error) {
    next(error);
  }
}
);

usersRouter.get("/me/accomodation", tokenAuthMiddleware, HostOnly, async (req, res, next) => {
  try {
    const userId = req.user._id
    console.log(userId)
    const accomodationsofUser = await accomodationModel.find({host: userId})
    res.send(accomodationsofUser)
  } catch (error) {
    next(error);
  }
}
);

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new userModel(req.body);
    const token = await generateToken(newUser)
    const { _id } = await newUser.save();
    res.send({ _id, token});
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", tokenAuthMiddleware, async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await userModel.checkCredentials(email, password)
    if(user) {
      const accessToken = await generateToken(user)
      res.send({accessToken})
    } else {
      next(createHttpError(401, "Credentials not correct"))
    }
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/:userId", tokenAuthMiddleware, HostOnly, async (req, res, next) => {
    try {
        const user = await userModel.findById({_id: req.params.userId}).populate({path: 'accomodations', select: "name"})
        res.send(user)
    } catch (error) {
      next(error);
    }
  }
);


usersRouter.get("/", async (req, res, next) => {
  try {
      const users = await userModel.find().populate('accomodations');
      res.send(users);
  } catch (error) {
    next(error);
  }
}
);


export default usersRouter;

