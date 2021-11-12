import express from "express";
import createHttpError from "http-errors";
import userModel from "./schema";
import accomodationModel from "../accomodations/schema";
import { tokenAuthMiddleware } from "../../midllewares/auth/tokenMiddleware";
import { generateToken } from "../../midllewares/auth/tokenAuth";
import { HostOnly } from "../../midllewares/auth/HostOnly";
import { userValidation } from "../../midllewares/validation/userValidation";
import { validationResult } from "express-validator"

interface user {
  name: string,
  surname: string,
  email: string,
  password: string, 
  role: string,
}

const usersRouter = express.Router();

usersRouter.post("/register", userValidation, async (req, res, next) => {
  try {
    const errorsList = validationResult(req)
    if (!errorsList.isEmpty()) {
      // If we had validation errors --> we need to trigger Bad Request Error Handler
      next(createHttpError(400, { errorsList }))
      
    } else{
      const newUser = new userModel(req.body);
      const { _id } = await newUser.save();
      const accessToken = await generateToken(newUser)
      res.status(201).send({ _id, accessToken});
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
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


// JUST FOR DEVELOPEMENT PURPOSES
// usersRouter.get("/", tokenAuthMiddleware, HostOnly, async (req, res, next) => {
//   try {
//       const users = await userModel.find();
//       res.send(users);
//   } catch (error) {
//     next(error);
//   }
// }
// );

usersRouter.get("/me", tokenAuthMiddleware, async (req, res, next) => {
  try {
      res.send(req.user);
  } catch (error) {
    next(error);
  }
}
);

// 🎉 to be checked
usersRouter.get("/me/accomodation", tokenAuthMiddleware, HostOnly, async (req, res, next) => {
  try {
    const userId = req.user._id
    console.log(userId)
    const accomodationsOfUser = await accomodationModel.find({host: userId})
    res.send(accomodationsOfUser)
  } catch (error) {
    next(error);
  }
}
);

// usersRouter.get("/:userId", tokenAuthMiddleware, HostOnly, async (req, res, next) => {
//     try {
//         const user = await userModel.findById({_id: req.params.userId}).populate({path: 'accomodations', select: "name"})
//         res.send(user)
//     } catch (error) {
//       next(error);
//     }
//   }
// );


export default usersRouter;

