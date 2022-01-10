import repositoryContacts from '../../repository/contacts'
import { httpCode } from '../../lib/constants'

const getContacts = async (req, res, next) => {
  const { id: userId } = req.user
  const contacts = await repositoryContacts.listContacts(userId, req.query)
  res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data: { ...contacts } })
}

const getContactById = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const contact = await repositoryContacts.getContactById(userId, id)
  if (contact) {
    return res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data: { contact } })
  }
  res.status(httpCode.NOT_FOUND).json({ status: 'error', code: httpCode.NOT_FOUND, message: 'Not found' })
}

const addContact = async (req, res, next) => {
  const { id: userId } = req.user
  const newContact = await repositoryContacts.addContact(userId, req.body)
  res.status(httpCode.CREATED).json({ status: 'success', code: httpCode.OK, data: { newContact } })
}

const removeContact = async (req, res, next) => {
  const { id: userId } = req.user
  const { id } = req.params
  const contact = await repositoryContacts.removeContact(userId, id)
  if (contact) {
    return res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data: { contact } })
  }
  res.status(httpCode.NOT_FOUND).json({ status: 'error', code: httpCode.NOT_FOUND, message: 'Not found' })
}

const updateContact = async (req, res, next) => {
  const { id: userId } = req.user
  const { id } = req.params
  const contact = await repositoryContacts.updateContact(userId, id, req.body)
  if (contact) {
    return res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data: { contact } })
  }
  res.status(httpCode.NOT_FOUND).json({ status: 'error', code: httpCode.NOT_FOUND, message: 'Not found' })
}

export { getContacts, getContactById, addContact, removeContact, updateContact }
