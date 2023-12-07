"use strict";
exports.__esModule = true;
exports.initHttpServer = void 0;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var routes_1 = require("./routes");
function initHttpServer() {
    var app = express_1["default"]();
    var API_PORT = process.env.API_PORT;
    app.use(body_parser_1["default"].urlencoded({ extended: false }));
    app.use(body_parser_1["default"].json());
    app.use(cors_1["default"]({
        origin: process.env.FRONTEND || 'http://localhost:5173'
    }));
    app.listen(API_PORT, function () {
        console.log("Server running on port at " + API_PORT);
    });
    routes_1.initRoutes(app);
}
exports.initHttpServer = initHttpServer;
