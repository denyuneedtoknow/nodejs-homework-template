const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'changing message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'posting message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'del message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'patch message' })
})

module.exports = router
