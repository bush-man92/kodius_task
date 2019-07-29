export default (sequelize, DataTypes) => {
	const Purchase = sequelize.define('Purchase', {
        user_id:{
            type:DataTypes.INTEGER
        },
        total_price:{
            type:DataTypes.INTEGER
        },
        address:{
            type:DataTypes.STRING
        },
        cupon_password:{
            type:DataTypes.STRING
        },
        credit_card:{
            type:DataTypes.STRING
        },
        security_number:{
            type:DataTypes.STRING
        }
	});

		return Purchase;
}