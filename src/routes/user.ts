import Router from "express";
import jwtMiddleware from "../util/jwtMiddleware";
import {
  getUsers,
  getUserById,
  postUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/user";

const router = Router();

router.get("/users", jwtMiddleware, getUsers);

router.get("/users/:ID", getUserById);

router.delete("/users/:ID", deleteUser);

router.post("/users", postUser);

router.post("/user/login", loginUser);

router.post("/users/:ID", updateUser);

export default router;
