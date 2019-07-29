
import jwt from 'jsonwebtoken';

const addToCart = async (parent, { token, item_id, modifier } ,{ models, SECRET }) => {
    const token_check = await jwt.verify(token, SECRET);
    const user = await models.User.findOne({ where: { id: token_check.user.id } });
    const user_id = user.id;
    const check_cart = await models.Cart.findOne({ where: { item_id : item_id}})
    if (check_cart !== null) {
        if (check_cart.item_quantity === 0) {
            models.Cart.destroy({ where: { item_id : item_id}})
        }
        if (modifier === '+') {
            models.Cart.update({item_quantity : check_cart.item_quantity + 1},
                { where: { item_id: item_id } })
            return ('Item added')
        }
        else if (modifier === '-') {
            models.Cart.update({item_quantity : check_cart.item_quantity - 1},
                { where: { item_id: item_id } })
            return ('Item removed')
        }
    }
    else if (check_cart === null){
        const item_quantity = 1;
        const cart = {user_id, item_id, item_quantity}
        const cart1 = await models.Cart.create(cart)
        return ('Item added')
    }
    else {
        return ('Not signed up')
    }
};

const cartView = async (parent, { id }, { models }) => {
    const user_id = id;
    const user_cart = await models.Cart.findAll({ where: { user_id : user_id }})
    class cartView {
        constructor(id, user_id, item_id, item_quantity, ) {
            this.id = id;
            this.user_id = user_id;
            this.item_id = item_id;
            this.item_quantity = item_quantity;
        }
    }
    const cart_views = []
    user_cart.forEach(element => {
        const item = new cartView(element.id, element.user_id, element.item_id, element.item_quantity,)
        cart_views.push(item)
    });
    const items_func = async () => {
        const complete_view = []
        for(const element of cart_views) {
            const items_cart = []
            const items_models = await models.Item.findOne({ where: { id : element.item_id }})
            const items_model_cart = []
            items_model_cart.push(items_models)
            class itemsView {
                constructor(id, name, price,) {
                    this.id = id;
                    this.name = name;
                    this.price = price;
                }
            }
            items_model_cart.forEach(element => {
                const item = new itemsView(element.id, element.name, element.price,)
                items_cart.push(item)
            });
            class completeView {
                constructor(item_id, item_name, item_quantity, item_price ) {
                    this.item_id = item_id;
                    this.item_name = item_name;
                    this.item_quantity = item_quantity;
                    this.item_price = item_price * item_quantity;
                }
            }
            items_cart.forEach(async element2 => {
                const item = new completeView(element.item_id, element2.name, element.item_quantity, element2.price)
                await complete_view.push(item);
            })
        }
        return complete_view
    };
    
    return await items_func()
}

export { addToCart, cartView };