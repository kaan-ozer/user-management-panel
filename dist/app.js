"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./routes/user"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import authenticateJWT from "./util/jwtMiddleware";
const PORT = 8080;
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/form", (req, res, next) => {
    try {
        return res
            .status(200)
            .render("../dist/views/form", { pageTitle: "Form", path: req.url });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
// app.use(authenticateJWT);
app.use("/", user_1.default);
app.use("/", (req, res, next) => {
    try {
        return res.status(200).render("../dist/views/welcome", {
            pageTitle: "Welcome",
            path: req.url,
            isLogged: req.query.isLogged,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(PORT, () => {
    console.log("Server started at port 8080");
});
