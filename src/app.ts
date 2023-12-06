import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/user";

import cookieParser from "cookie-parser";

// import authenticateJWT from "./util/jwtMiddleware";

const PORT = 8080;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/form", (req, res, next) => {
  try {
    return res
      .status(200)
      .render("../dist/views/form", { pageTitle: "Form", path: req.url });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
// app.use(authenticateJWT);

app.use("/", userRoutes);

app.use("/", (req, res, next) => {
  try {
    return res.status(200).render("../dist/views/welcome", {
      pageTitle: "Welcome",
      path: req.url,
      isLogged: req.query.isLogged,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log("Server started at port 8080");
});
