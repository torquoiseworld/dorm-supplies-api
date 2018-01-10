const User = require('../models/schemas/user')

/*
* C.R.U.D. Controllers
*/
exports.createUser = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send('Must provide email')
  }
  if (!req.body.password) {
    return res.status(400).send('Must provide valid password')
  }
  if (!req.body.name) {
    return res.status(400).send('Must provide name')
  }
  /*if (typeof(req.body.isAdmin) !== 'boolean') {
    return res.status(400).send('Must provide isAdmin value')
  }*/
  if (!req.body.address) {
    return res.status(400).send('Must provide address')
  }
  if (!req.body.classYear) {
    return res.status(400).send('Must provide classYear')
  }
  console.log('1')
  const userData = {
    email: req.body.email,
    hash: req.body.password,
    name: req.body.name,
    //isAdmin: req.body.isAdmin,
    address: req.body.address,
    classYear: req.body.classYear
  }
  console.log('2')
  //console.log(userData)
  
  const newUser = new User(userData)
  console.log('3')
  //console.log('User ', newUser, User)
  newUser.save((err) => {
    if (err) next(err)
    return res.json(newUser)
  })
}

exports.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) next(err)
    return res.json(users)
  })
}

exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('No user with id: ' + req.params.userId)
    return res.json(user)    
  })
}

exports.getUserByEmail = (req, res, next) => {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('No user with email: ' + req.params.email)
    return res.json(user)    
  })
}

exports.updateUser = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, {}, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('Could not find user: ' + req.params.userId)
    return res.json(user)
  })
}
exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('Could not find user ' + req.params.userId)
    return res.json(user)
  })
}
