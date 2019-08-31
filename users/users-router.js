// Enable tools 🔨
const router = require('express').Router()
const Users = require('../models/user-model.js')
const authenticate = require('../auth/authenticate-middleware')

// Set up endpoints ☠️
router.get('/', authenticate, async (req, res) => {
  try {
    const users = await Users.find()
    if (users) {
      res.status(200).json(users)
    } else {
      res.status(404).json({ message: 'Could not find users 🤷‍' })
    }
  } catch (e) {
    res.status(500).json({ message: 'Failed to get users ☠️' })
  }
})

router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.findById(id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({
        message: 'Could not find user with given id 🤷‍'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Failed to get schemes ☠️'
    })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const changes = req.body
  try {
    const user = await Users.findById(id)
    if (user) {
      const updatedUser = await Users.update(changes, id)
      res.json(updatedUser)
    } else {
      res.status(404).json({
        message: 'Could not find user with given id 🤷‍'
      })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user ☠️' })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await Users.remove(id)
    if (deleted) {
      res.json({ removed: deleted })
    } else {
      res.status(404).json({
        message: 'Could not find the user with given id 🤷‍'
      })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user ☠️' })
  }
})

// Export router 🚀
module.exports = router