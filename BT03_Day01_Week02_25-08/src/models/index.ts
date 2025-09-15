// src/models/index.ts
import { Sequelize } from "sequelize";
import { User } from "./user"; // import model User

// Khởi tạo Sequelize
const sequelize = new Sequelize("database_development", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// Khởi tạo models
User.initModel(sequelize);

// Gom tất cả models vào object db
const db = {
  sequelize,
  User,
};

export default db; 