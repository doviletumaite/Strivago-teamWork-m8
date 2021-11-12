"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var schema_1 = __importDefault(require("./schema"));
var schema_2 = __importDefault(require("../accomodations/schema"));
var tokenMiddleware_1 = require("../../midllewares/auth/tokenMiddleware");
var tokenAuth_1 = require("../../midllewares/auth/tokenAuth");
var HostOnly_1 = require("../../midllewares/auth/HostOnly");
var userValidation_1 = require("../../midllewares/validation/userValidation");
var express_validator_1 = require("express-validator");
var usersRouter = express_1.default.Router();
usersRouter.post("/register", userValidation_1.userValidation, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errorsList, newUser, _id, accessToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                errorsList = (0, express_validator_1.validationResult)(req);
                if (!!errorsList.isEmpty()) return [3 /*break*/, 1];
                // If we had validation errors --> we need to trigger Bad Request Error Handler
                next((0, http_errors_1.default)(400, { errorsList: errorsList }));
                return [3 /*break*/, 4];
            case 1:
                newUser = new schema_1.default(req.body);
                return [4 /*yield*/, newUser.save()];
            case 2:
                _id = (_a.sent())._id;
                return [4 /*yield*/, (0, tokenAuth_1.generateToken)(newUser)];
            case 3:
                accessToken = _a.sent();
                res.status(201).send({ _id: _id, accessToken: accessToken });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
usersRouter.post("/login", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, accessToken, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, schema_1.default.checkCredentials(email, password)];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, tokenAuth_1.generateToken)(user)];
            case 2:
                accessToken = _b.sent();
                res.send({ accessToken: accessToken });
                return [3 /*break*/, 4];
            case 3:
                next((0, http_errors_1.default)(401, "Credentials not correct"));
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
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
usersRouter.get("/me", tokenMiddleware_1.tokenAuthMiddleware, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.send(req.user);
        }
        catch (error) {
            next(error);
        }
        return [2 /*return*/];
    });
}); });
// 🎉 to be checked
usersRouter.get("/me/accomodation", tokenMiddleware_1.tokenAuthMiddleware, HostOnly_1.HostOnly, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, accomodationsOfUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user._id;
                console.log(userId);
                return [4 /*yield*/, schema_2.default.find({ host: userId })];
            case 1:
                accomodationsOfUser = _a.sent();
                res.send(accomodationsOfUser);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// usersRouter.get("/:userId", tokenAuthMiddleware, HostOnly, async (req, res, next) => {
//     try {
//         const user = await userModel.findById({_id: req.params.userId}).populate({path: 'accomodations', select: "name"})
//         res.send(user)
//     } catch (error) {
//       next(error);
//     }
//   }
// );
exports.default = usersRouter;
