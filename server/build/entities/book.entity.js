"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
var book_repository_1 = __importDefault(require("../infraestructure/db/repositories/book.repository"));
var base_entity_1 = require("./base.entity");
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(title, author, id) {
        var _this = _super.call(this, id, book_repository_1.default) || this;
        _this._title = title;
        _this._author = author;
        return _this;
    }
    Object.defineProperty(Book.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Book.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Book.prototype, "author", {
        get: function () {
            return this._author;
        },
        enumerable: false,
        configurable: true
    });
    return Book;
}(base_entity_1.BaseEntity));
exports.Book = Book;
