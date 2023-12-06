"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = __importDefault(require("../db/db"));
function isNotEmptyArray(arr) {
    return Array.isArray(arr) && arr.length > 0;
}
class User {
    static async getAllUsers(query = []) {
        try {
            let users;
            if (isNotEmptyArray(query)) {
                users = await db_1.default.select(query).from(this.tableName);
            }
            else {
                users = await db_1.default.select("*").from(this.tableName);
            }
            return users;
        }
        catch (error) {
            throw new Error(` ${error}`);
        }
    }
    static async getUserById(userId, query = []) {
        try {
            let user;
            if (isNotEmptyArray(query)) {
                user = await db_1.default
                    .select(query)
                    .from(this.tableName)
                    .where({ id: userId })
                    .first();
            }
            else {
                user = await db_1.default
                    .select("*")
                    .from(this.tableName)
                    .where({ id: userId })
                    .first();
            }
            return user;
        }
        catch (error) {
            throw new Error(` ${error}`);
        }
    }
    static async getUserByName(name, query = []) {
        try {
            let user;
            if (isNotEmptyArray(query)) {
                user = await db_1.default
                    .select(query)
                    .from(this.tableName)
                    .where({ first_name: name })
                    .first();
            }
            else {
                user = await db_1.default
                    .select("*")
                    .from(this.tableName)
                    .where({ first_name: name })
                    .first();
            }
            return user;
        }
        catch (error) {
            throw new Error(` ${error}`);
        }
    }
    static async postUser(user) {
        try {
            user = await (0, db_1.default)(this.tableName).insert(user);
        }
        catch (error) {
            throw new Error(` ${error}`);
        }
    }
    static async updateUser(userId, updatedUser) {
        try {
            console.log(updatedUser);
            await (0, db_1.default)(this.tableName).where({ id: userId }).update(updatedUser);
        }
        catch (error) {
            throw new Error(`HELP ${error}`);
        }
    }
    static async deleteUser(userId) {
        try {
            await (0, db_1.default)(this.tableName).where({ id: userId }).del();
        }
        catch (error) {
            throw new Error(` ${error}`);
        }
    }
}
exports.User = User;
User.tableName = "Users";
