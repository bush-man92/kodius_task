
const createPurchase = async (parent, {email, address, security_number, credit_card, cupon_password}, {models}) => {
    const user = await models.User.findOne({ where: {email: email}})
    const cart = await models.Cart.findAll({ where: {user_id: user.id}})
    const items = []
    const user_id = user.id
    if (cart !== false) {
        class cartView {
            constructor(id, user_id, item_id, item_quantity, item_price, item_name ) {
                this.id = id;
                this.user_id = user_id;
                this.item_id = item_id;
                this.item_quantity = item_quantity;
                this.item_price = item_price;
                this.item_name = item_name
            }
        }
        const items = []
        var total_price = 0;
        for(const element of cart) {
            const item = await models.Item.findOne({ where: {id: element.item_id}})
            total_price += element.item_quantity * item.price;
            const item2 = new cartView (element.id, element.user_id, element.item_id,
                element.item_quantity, item.price, item.name)
            items.push(item2)
        };
        const discount = await models.Cupons.findOne({ where: {cupon_password: cupon_password}})
        if (discount !== null) {
            let num = discount.discount;
            if (discount.modifier === '-') {
                total_price -= num
            }
            else if (discount.modifier === '%') {
                num *= 0.01
                total_price -= (total_price * num)
            }
        }
        const purchase = {user_id, total_price, address, cupon_password, credit_card, security_number}
        const purchase2 = await models.Purchase.create(purchase)

        class response {
            constructor (item_id, item_name, item_quantity, item_price, total_price, cupon_password) {
                this.item_id = item_id
                this.item_name = item_name,
                this.item_quantity = item_quantity,
                this.item_price = item_price,
                this.total_price = total_price,
                this.cupon_password = cupon_password
            }
        }

        models.Cart.destroy({ where: {user_id: user.id}})

        const response2 = []

        items.forEach (element => {
            const item = new response (element.id, element.item_name, element.item_quantity, element.item_price, total_price, cupon_password)
            response2.push(item)
        })

        return response2
    }
    else {
        return null
    }
}

export { createPurchase }