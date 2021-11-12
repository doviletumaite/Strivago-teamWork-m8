"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
var routes_1 = __importDefault(require("./services/users/routes"));
var routes_2 = __importDefault(require("./services/accomodations/routes"));
var errorHandlers_js_1 = require("./errorHandlers.js");
process.env.TS_NODE_DEV && require("dotenv").config();
var server = (0, express_1.default)();
var port = process.env.PORT || 3001;
// ******************** MIDDLEWARES *************************+
server.use((0, cors_1.default)());
server.use(express_1.default.json());
// ******************** ROUTES ******************************
server.use("/users", routes_1.default);
server.use("/accomodations", routes_2.default);
// ********************** ERROR HANDLERS *************************
server.use(errorHandlers_js_1.badRequest);
server.use(errorHandlers_js_1.unauthorized);
server.use(errorHandlers_js_1.forbidden);
server.use(errorHandlers_js_1.notFound);
server.use(errorHandlers_js_1.serverError);
console.table((0, express_list_endpoints_1.default)(server));
mongoose_1.default.connect(process.env.MONGO_CONNECTION);
mongoose_1.default.connection.on("connected", function () {
    console.log("🚀 Mongo connected!");
    server.listen(port, function () {
        console.log("\uD83C\uDF88 Server running on port " + port);
    });
});
