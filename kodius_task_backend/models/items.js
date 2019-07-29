export default (sequelize, DataTypes) => {
	const Item = sequelize.define('Item', {
        name:{
			type:DataTypes.STRING
        },
        price:{
            type:DataTypes.INTEGER
        },
        picture:{
            type:DataTypes.STRING
        },
        about:{
            type:DataTypes.STRING
        },
	});
		return Item;
}