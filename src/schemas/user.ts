import db from "../db/db";

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  pass: string;
  roles: string;
}

function isNotEmptyArray(arr: any[]): boolean {
  return Array.isArray(arr) && arr.length > 0;
}

export class User {
  private static tableName = "Users";

  static async getAllUsers(query: string[] = []): Promise<IUser[]> {
    try {
      let users;

      if (isNotEmptyArray(query)) {
        users = await db.select(query).from(this.tableName);
      } else {
        users = await db.select("*").from(this.tableName);
      }
      return users;
    } catch (error) {
      throw new Error(` ${error}`);
    }
  }

  static async getUserById(
    userId: string,
    query: string[] = []
  ): Promise<IUser | undefined> {
    try {
      let user;

      if (isNotEmptyArray(query)) {
        user = await db
          .select(query)
          .from(this.tableName)
          .where({ id: userId })
          .first();
      } else {
        user = await db
          .select("*")
          .from(this.tableName)
          .where({ id: userId })
          .first();
      }

      return user;
    } catch (error) {
      throw new Error(` ${error}`);
    }
  }

  static async getUserByName(
    name: string,
    query: string[] = []
  ): Promise<IUser | undefined> {
    try {
      let user;

      if (isNotEmptyArray(query)) {
        user = await db
          .select(query)
          .from(this.tableName)
          .where({ first_name: name })
          .first();
      } else {
        user = await db
          .select("*")
          .from(this.tableName)
          .where({ first_name: name })
          .first();
      }

      return user;
    } catch (error) {
      throw new Error(` ${error}`);
    }
  }

  static async postUser(user: IUser): Promise<void> {
    try {
      user = await db(this.tableName).insert(user);
    } catch (error) {
      throw new Error(` ${error}`);
    }
  }

  static async updateUser(
    userId: string,
    updatedUser: Partial<IUser>
  ): Promise<void> {
    try {
      console.log(updatedUser);
      await db(this.tableName).where({ id: userId }).update(updatedUser);
    } catch (error) {
      throw new Error(`HELP ${error}`);
    }
  }

  static async deleteUser(userId: string): Promise<void> {
    try {
      await db(this.tableName).where({ id: userId }).del();
    } catch (error) {
      throw new Error(` ${error}`);
    }
  }
}
