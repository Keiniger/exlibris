"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/index.ts
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
exports.app = app;
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server running on port at ".concat(PORT));
});
