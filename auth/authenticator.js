module.exports = (req, res, next) => {
  if(req.session.loggedIn) {
    next()
  } else {
    res.status(401).json({ message: "You must be logged in to do that." })
  }
}