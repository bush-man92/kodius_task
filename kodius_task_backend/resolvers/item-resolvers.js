
const allItems = ({ models }) => { return models.Item.findAll() };

const itemsOverview = async (parent, { name }, { models }) => {
    var items = []
    if (name) {
        items = await models.Item.findAll({where: {name : name}});
        }
    else {
        items = await models.Item.findAll()
    }
    class itemView {
        constructor(id, name, price, picture, about) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.picture = picture;
            this.about = about;
        }
    }
    const item_views = []
    items.forEach(element => {
        const item = new itemView(element.id, element.name, element.price, element.picture, element.about)
        item_views.push(item)
    });
    
    return item_views;
}

const addItem = async (parent, {name, price, picture, about} ,{ models }) =>{
    const item = {name, price, picture, about}
    const item2 = await models.Item.create(item);

    if (item2) {
        return "Item created"
    }
    else {
        return "Item not created"
    }
};

export { allItems, addItem, itemsOverview }