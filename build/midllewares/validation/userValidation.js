"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
var express_validator_1 = require("express-validator");
exports.userValidation = [
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email is a mandatory field!")
        .isEmail()
        .withMessage("Please send a valid email!"),
    (0, express_validator_1.body)("password")
        .exists()
        .isLength({ min: 5 })
        .withMessage("Password must be at least 3 digits long!")
        .matches(/\d/)
        .withMessage("Password must contain a number")
    // .isIn(["123", "password"])
    // .withMessage("Please do not use a common password!"),
];
