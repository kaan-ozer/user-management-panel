"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "root";
function authenticateJWT(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = user;
        next();
    }
    catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
}
exports.default = authenticateJWT;
