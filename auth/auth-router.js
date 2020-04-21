const router = require("express").Router();
const bcrypt = require('bcryptjs')

const Users = require("../users/users-model");

router.post('/register', (req, res) => {
  let user = req.body

  const rounds = process.env.HASH_ROUNDS || 12;

  user.password = bcrypt.hashSync(user.password, rounds)

  Users.add(user)
  .then(saved => {
    req.session.loggedIn = true;
    res.status(201).json(saved)
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: err.message })
  })
})


router.post('/login', (req, res) => {
  let { username, password } = req.body

  Users.findBy({ username })
  .then(([foundUser]) => {
    if(foundUser && bcrypt.compareSync(password, foundUser.password)) {
      req.session.loggedIn = true;
      res.status(200).json({ message: 'welcome home' })
    } else {
      res.status(401).json({ message: "you shall not pass" })
    }
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: err.message })
  })
})

module.exports = router;