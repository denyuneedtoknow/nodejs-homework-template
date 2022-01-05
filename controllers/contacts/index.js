import repositoryContacts from '../../repository/contacts'
import { httpCode } from '../../lib/constants'

const getContacts = async (req, res, next) => {
  const contacts = await repositoryContacts.listContacts(req.query)
  res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data: { ...contacts } })
}

const getContactById = async (req, res, next) => {
  const { id } = req.params
  const contact = await repositoryContacts.getContactById(id)
  if (contact) {
    return res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data: { contact } })
  }
  res.status(httpCode.NOT_FOUND).json({ status: 'error', code: httpCode.NOT_FOUND, message: 'Not found' })
}

const addContact = async (req, res, next) => {
  const newContact = await repositoryContacts.addContact(req.body)
  res.status(httpCode.CREATED).json({ status: 'success', code: httpCode.OK, data: { newContact } })
}

const removeContact = async (req, res, next) => {
  const { id } = req.params
  const contact = await repositoryContacts.removeContact(id)
  if (contact) {
    console.log(contact)
    return res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data: { contact } })
  }
  res.status(httpCode.NOT_FOUND).json({ status: 'error', code: httpCode.NOT_FOUND, message: 'Not found' })
}

const updateContact = async (req, res, next) => {
  const { id } = req.params
  const contact = await repositoryContacts.updateContact(id, req.body)
  if (contact) {
    return res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data: { contact } })
  }
  res.status(httpCode.NOT_FOUND).json({ status: 'error', code: httpCode.NOT_FOUND, message: 'Not found' })
}

export { getContacts, getContactById, addContact, removeContact, updateContact }
