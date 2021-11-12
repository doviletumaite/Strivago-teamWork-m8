"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = exports.forbidden = exports.unauthorized = exports.badRequest = void 0;
var badRequest = function (err, req, res, next) {
    console.log(err.errorsList);
    if (err.status === 400) {
        res.status(400).send({ message: err.errorsList });
    }
    else {
        next(err);
    }
};
exports.badRequest = badRequest;
var unauthorized = function (err, req, res, next) {
    if (err.status === 401) {
        res
            .status(401)
            .send({
            status: "error",
            message: err.message || "You are not logged in!",
        });
    }
    else {
        next(err);
    }
};
exports.unauthorized = unauthorized;
var forbidden = function (err, req, res, next) {
    if (err.status === 403) {
        res
            .status(403)
            .send({
            status: "error",
            message: err.message || "You are not allowed to do that!",
        });
    }
    else {
        next(err);
    }
};
exports.forbidden = forbidden;
var notFound = function (err, req, res, next) {
    console.log(err);
    if (err.status === 404) {
        res.status(404).send({ err: err.message || "Not Found!" });
    }
    else {
        next(err);
    }
};
exports.notFound = notFound;
var serverError = function (err, req, res, next) {
    console.log(err);
    res.status(500).send({ status: "error", message: "Generic Server Error" });
};
exports.serverError = serverError;
