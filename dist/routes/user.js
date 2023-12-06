"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = __importDefault(require("../util/jwtMiddleware"));
const user_1 = require("../controllers/user");
const router = (0, express_1.default)();
router.get("/users", jwtMiddleware_1.default, user_1.getUsers);
router.get("/users/:ID", user_1.getUserById);
router.delete("/users/:ID", user_1.deleteUser);
router.post("/users", user_1.postUser);
router.post("/user/login", user_1.loginUser);
router.post("/users/:ID", user_1.updateUser);
exports.default = router;
