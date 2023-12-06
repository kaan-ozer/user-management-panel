import { Knex } from "knex";

// Update with your config settings.
interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: "postgresql",
    connection: {
      database: "",
      user: "",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default configs;
