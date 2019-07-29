
const createCupon = async (parent, {discount, cupon_password, modifier}, { models }) => {
    const cupon = {discount, cupon_password, modifier}
    const cupon2 = await models.Cupons.create(cupon)

    return 'Cupon created'
}


export { createCupon } 