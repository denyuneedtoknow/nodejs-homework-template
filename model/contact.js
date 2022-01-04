import pkg from 'mongoose'
import { MAX_AGE, MIN_AGE } from '../lib/constants'
const { Schema, model } = pkg

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  age: { type: Number, default: null, min: MIN_AGE, max: MAX_AGE, },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id
      return ret
    }
  },
  toObject: {}
})

contactSchema.virtual('status').get(function () {
  if (this.age >= 40) {
    return 'old'
  } else {
    return 'young'
  }
})

const Contact = model('contact', contactSchema)
export default Contact
