"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.loginUser = exports.deleteUser = exports.postUser = exports.getUserById = exports.getUsers = void 0;
const uuid_1 = require("uuid");
const user_1 = require("../schemas/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers = async (req, res, next) => {
    try {
        const SELECTED_COLUMNS = ["id", "first_name"];
        //******************************
        // -) If we don't pass query, it will select all *
        const allUsers = await user_1.User.getAllUsers();
        //******************************
        // const allUsers = await User.getAllUsers(SELECTED_COLUMNS);
        const result = await allUsers;
        return res.status(200).render("../dist/views/user-list", {
            pageTitle: "Welcome",
            path: req.url,
            users: allUsers,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res, next) => {
    try {
        const SELECTED_COLUMNS = ["id", "first_name"];
        //******************************
        // -) If we don't pass query, it will select all *
        // const user = await User.getUserById(
        //   Number(req.params.ID)
        // );
        //******************************
        const user = await user_1.User.getUserById(req.params.ID);
        return res.status(200).render("../dist/views/user-details", {
            pageTitle: "User Details",
            path: req.url,
            user: user,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getUserById = getUserById;
const postUser = async (req, res, next) => {
    try {
        const newUser = {
            id: (0, uuid_1.v4)(),
            first_name: "First_Name",
            last_name: "Last_Name",
            pass: "123",
            roles: "admin",
        };
        await user_1.User.postUser(newUser);
        res.status(201).json({
            message: "A dummy person data added successfully",
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.postUser = postUser;
const deleteUser = async (req, res, next) => {
    try {
        await user_1.User.deleteUser(req.params.ID);
        res.status(201).json({
            message: "A dummy person data added successfully",
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.deleteUser = deleteUser;
const loginUser = async (req, res, next) => {
    try {
        const { userName, userPass } = req.body;
        const user = await user_1.User.getUserByName(userName);
        if ((user === null || user === void 0 ? void 0 : user.pass) != userPass) {
            return res.status(403).json({ err: "invalid Login" });
        }
        if (user) {
            const token = jsonwebtoken_1.default.sign(user, "root", { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: true,
            });
        }
        res.status(200).redirect("http://localhost:8080/welcome?isLogged=true");
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.loginUser = loginUser;
const updateUser = async (req, res, next) => {
    try {
        const { editFirstName, editLastName } = req.body;
        const newUser = {
            id: (0, uuid_1.v4)(),
            first_name: editFirstName,
            last_name: editLastName,
            pass: "1234",
            roles: "admin",
        };
        await user_1.User.updateUser(req.params.ID, newUser);
        res.status(200).redirect("http://localhost:8080/users");
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.updateUser = updateUser;
