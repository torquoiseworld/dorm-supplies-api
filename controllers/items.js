const Item = require('../models/schemas/item')

exports.createItem = (req, res, next) => {
	console.log('here')
  if (!req.body.name) {
    return res.status(400).send('Must provide name')
  }
  if (!req.body.price) {
    return res.status(400).send('Must provide price')
  }
  if (!req.body.description) {
    return res.status(400).send('Must provide description')
  }
  if (!req.body.quantity && req.body.quantity !== 0) {
    return res.status(400).send('Must provide quantity')
  }
  if (!req.body.pic) {
    return res.status(400).send('Must provide pic')
  }
  const itemData = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    pic: req.body.pic
  }
  const newItem = new Item(itemData)
  newItem.save((err) => {
    if (err) next(err)
    return res.json(newItem)
  })
}

exports.getAllItems = (req, res, next) => {
  Item.find({}, (err, items) => {
    if (err) next(err)
    return res.json(items)
  })
}

//Get items where quantity > 0
exports.getActiveItems = (req, res, next) => {
	Item.find({quantity: {$gt: 0}}, (err, items) => {
		if(err) next(err)
		return res.json(items)	
	})
}

exports.getItemById = (req, res, next) => {
  Item.findById(req.params.itemId, (err, item) => {
    if (err) next(err)
    if (!item) return res.status(404).send('No item with id: ' + req.params.itemId)
    return res.json(item)    
  })
}

exports.updateItem = (req, res, next) => {
  Item.findOneAndUpdate({ _id: req.params.userId }, req.body, {}, (err, user) => {
    if (err) return res.sendStatus(500)
    if (!item) return res.status(404).send('Could not find item: ' + req.params.itemId)
    return res.json(item)
  })
}
exports.deleteItem = (req, res, next) => {
  Item.findByIdAndRemove(req.params.itemId, (err, item) => {
    if (err) return res.sendStatus(500)
    if (!item) return res.status(404).send('Could not find item ' + req.params.itemId)
    return res.json(item)
  })
}
/*
// helper function that gets price
getPrice(itemId) {

*/
/*

exports.buyCart = (req, res, next) => {
	let itemsList = [] 
	for (let item of req.body.items) {
		const itemData = {
    		itemId: item.itemId,
    		quantity: item.quantity,
    		price: getPrice(item.itemId)
  		}
		itemsList.push(itemData)
	}
	const order = {
		items: itemsList,
		purchasedDate: new Date(),
		deliveredDate: undefined,
		isPaid = false
	}

	User.findOneAndUpdate({ _id: req.params.userId }, req.body, {}, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('Could not find user: ' + req.params.userId)
    return res.json(user)
  })
*/

//}
