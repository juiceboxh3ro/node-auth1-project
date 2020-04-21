const router = require("express").Router();
const Users = require("./users-model.js");
const gatekeeper = require('../auth/authenticator')

// use middleware to check that the user is logged in first
router.use(gatekeeper)

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
