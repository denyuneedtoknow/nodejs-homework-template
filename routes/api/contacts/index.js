import { Router } from 'express'
import { getContacts, getContactById, addContact, removeContact, updateContact } from '../../../controllers/contacts'
import { validateCreate, validateUpdate, validateId, validateUpdateFavorite, validateQuery } from './validation'
const router = new Router()

router.get('/', validateQuery, getContacts)

router.get('/:id', validateId, getContactById)

router.post('/', validateCreate, addContact)

router.delete('/:id', validateId, removeContact)

router.patch('/:id/favorite', validateId, validateUpdateFavorite, updateContact)

router.put('/:id', validateId, validateUpdate, updateContact)

export default router
