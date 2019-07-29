
export default (sequelize, DataTypes) => {
    const Cart = sequelize.define('Carts', {
        user_id:{
            type:DataTypes.INTEGER
        },
        item_id:{
            type:DataTypes.INTEGER
        },
        item_quantity:{
            type:DataTypes.INTEGER
        },
    });
    
    return Cart;
}  