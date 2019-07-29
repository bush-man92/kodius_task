export default (sequelize, DataTypes) => {
	const Cupons = sequelize.define('Cupons', {
        discount:{
            type:DataTypes.INTEGER
        },
        cupon_password:{
            type:DataTypes.STRING
        },
        modifier:{
            type:DataTypes.STRING
        }
	});

		return Cupons;
}