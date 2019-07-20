import Sequelize from 'sequelize';
import User from './users';
require('dotenv').config()


const sequelize = new Sequelize(
	 process.env.DB,
	 process.env.DB_USER,
	 process.env.DB_PASS,
	 {
		host : process.env.DB_HOST,
		dialect : process.env.DB_DIALECT
	 }

);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, Sequelize);

export default db;