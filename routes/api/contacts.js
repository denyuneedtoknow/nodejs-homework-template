import express from 'express'
const router = express.Router()
import model from "../../model/index"

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts()
  res.status(200).json({ contacts })
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const contact = await model.getContactById(id)
  if (contact) {
    return res.status(200).json(contact)
  }
  res.status(404).json({ "message": "Not found" })
})



router.post('/', async (req, res, next) => {
  res.status(200).json({ message: 'posting message' })
})

router.delete('/:id', async (req, res, next) => {
  res.status(200).json({ message: 'del message' })
})

router.patch('/:id', async (req, res, next) => {
  res.status(200).json({ message: 'patch message' })
})

export default router
