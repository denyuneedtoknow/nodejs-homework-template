import joi from 'joi'
import pkg from 'mongoose'
import { MIN_AGE, MAX_AGE } from '../../../lib/constants'
const { Types } = pkg

const createSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  age: joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: joi.bool().optional(),
})
const updateSchema = joi.object({
  name: joi.string().optional(),
  email: joi.string().email().optional(),
  phone: joi.string().optional(),
  age: joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: joi.bool().optional(),
}).or('name', 'email', 'phone', 'age', 'favorite')

const updateFavoriteSchema = joi.object({
  favorite: joi.bool().required(),
})
const querySchema = joi.object({
  limit: joi.number().min(5).max(100).optional(),
  skip: joi.number().min(0).optional(),
  sortBy: joi.string().valid('name', 'email', 'phone', 'age', 'favorite').optional(),
  sortByDesc: joi.string().valid('name', 'email', 'phone', 'age', 'favorite').optional(),
  // eslint-disable-next-line prefer-regex-literals
  filter: joi.string().pattern(new RegExp('(name|email|phone|age|favorite)\\|?(name|email|phone|age|favorite)+'))
})

export const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.unknown') {
      return res.status(400).json({ message: 'missing field ' })
    }
    return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` })
  }
  next()
}
export const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.missing') {
      return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` })
    }
    return res.status(400).json({ message: 'missing fields' })
  }
  next()
}
export const validateUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.missing') {
      return res.status(400).json({ message: 'Missing field favorite' })
    }
    return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` })
  }
  next()
}

export const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ObjectId' })
  }
  next()
}
export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.unknown') {
      return res.status(400).json({ message: 'missing field ' })
    }
    return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` })
  }
  next()
}
