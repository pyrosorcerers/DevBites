const authorizeAdmin = (req, res, next) => {
  if (req.user.isAdmin) next()
  else {
    res.status(403).json('Restricted Access!')
  }
}

const authorizeCorrectUser = (req, res, next) => {
  if (req.user.id === +req.params.id) {
    next()
  } else {
    res.status(403).json('Restricted Access!')
  }
}

const authorizeMyCart = (req, res, next) => {
  if (req.user.id === +req.body.userId) {
    next()
  } else {
    res.status(403).json('Restricted Access!')
  }
}

module.exports = {
  authorizeAdmin,
  authorizeCorrectUser,
  authorizeMyCart
}
