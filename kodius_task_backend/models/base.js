import Sequelize from 'sequelize';
import User from './users';
import Item from './items';
import Purchase from './purchases'
import Cupons from './cupons'
import Cart from './carts'
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
db.Item = Item(sequelize, Sequelize);
db.Purchase = Purchase(sequelize, Sequelize);
db.Cupons = Cupons(sequelize, Sequelize);
db.Cart = Cart(sequelize, Sequelize);

export default db;