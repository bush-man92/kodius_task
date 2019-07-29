
const createPurchase = async (parent, {email, address, security_number, credit_card, promotion}, {models}) => {
    const user = await models.User.findOne({ where: {email: email}})
    const cart = await models.Cart.findAll({ where: {user_id: user.id}})
    const items = []
    const user_id = user.id
    for(const element of cart) {
        const item = await models.Item.findOne({ where: {id: element.item_id}})
        items.push(item)
    };    
    class cartView {
        constructor(id, user_id, item_id, item_quantity, ) {
            this.id = id;
            this.user_id = user_id;
            this.item_id = item_id;
            this.item_quantity = item_quantity;
        }
    }
    const cart_views = []
    cart.forEach(element => {
        const item = new cartView(element.id, element.user_id, element.item_id, element.item_quantity,)
        cart_views.push(item)
    });
    var total_price = 0;
    items.forEach(element => {
        cart_views.forEach(element2 => {
            total_price += element.price * element2.item_quantity;
        })
    })
    const discount = await models.Cupons.findOne({ where: {cupon_password: promotion}})
    if (discount !== null) {
        let num = discount.discount;
        if (discount.modifier === '-') {
            total_price -= num
        }
        else if (discount.modifier === '%') {
            num *= 0.1
            total_price -= (total_price * num)
        }
    }
    const purchase = {user_id, total_price, address, promotion, credit_card, security_number}
    const purchase2 = await models.Purchase.create(purchase)

    class response {
        constructor (item_name, item_quantity, item_price, total_price, discount) {
            this.item_name = item_name,
            this.item_quantity = item_quantity,
            this.item_price = item_price,
            this.total_price = total_price,
            this.discount = discount
        }
    }

    models.Cart.destroy({ where: {user_id: user.id}})

    const response2 = []

    cart_views.forEach(element => {
        items.forEach (element2 => {
            const item = new response (element2.name, element.item_quantity, element2.price, total_price, discount)
            response2.push(item)
        })
    })

    return response2
}

export { createPurchase }