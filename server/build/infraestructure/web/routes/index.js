"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("../express");
express_1.app.get('/', function (req, res) {
    res.send('Hello, this is your TypeScript Node.js server with Express!');
});
