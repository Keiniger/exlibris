"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.get('/', function (req, res) {
    res.send('Hello, this is your TypeScript Node.js server with Express!');
});
app.listen(PORT, function () {
    console.log("Server running on port at ".concat(PORT));
});
