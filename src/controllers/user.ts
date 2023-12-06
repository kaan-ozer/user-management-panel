import { v4 as uuidv4 } from "uuid";
import { RequestHandler } from "express";
import { IUser, User } from "../schemas/user";
import jwt from "jsonwebtoken";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const SELECTED_COLUMNS = ["id", "first_name"];
    //******************************
    // -) If we don't pass query, it will select all *
    const allUsers = await User.getAllUsers();
    //******************************
    // const allUsers = await User.getAllUsers(SELECTED_COLUMNS);

    const result = await allUsers;

    return res.status(200).render("../dist/views/user-list", {
      pageTitle: "Users",
      path: req.url,
      users: allUsers,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const SELECTED_COLUMNS = ["id", "first_name"];
    //******************************
    // -) If we don't pass query, it will select all *
    // const user = await User.getUserById(
    //   Number(req.params.ID)
    // );
    //******************************

    const user = await User.getUserById(req.params.ID);

    return res.status(200).render("../dist/views/user-details", {
      pageTitle: "User Details",
      path: req.url,
      user: user,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const postUser: RequestHandler = async (req, res, next) => {
  try {
    const newUser: IUser = {
      id: uuidv4(),
      first_name: "First_Name",
      last_name: "Last_Name",
      pass: "123",
      roles: "admin",
    };

    await User.postUser(newUser);

    res.status(201).json({
      message: "A dummy person data added successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    await User.deleteUser(req.params.ID);

    res.status(201).json({
      message: "A dummy person data added successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { userName, userPass } = req.body;

    const user = await User.getUserByName(userName);

    if (user?.pass != userPass) {
      return res.status(403).json({ err: "invalid Login" });
    }
    if (user) {
      const token = jwt.sign(user, "root", { expiresIn: "1h" });
      res.cookie("token", token, {
        httpOnly: true,
      });
    }

    res.status(200).redirect("http://localhost:8080/welcome?isLogged=true");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { editFirstName, editLastName } = req.body;

    const newUser: IUser = {
      id: uuidv4(),
      first_name: editFirstName,
      last_name: editLastName,
      pass: "1234",
      roles: "admin",
    };

    await User.updateUser(req.params.ID, newUser);

    res.status(200).redirect("http://localhost:8080/users");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
