import pkg from 'mongoose';
const { Schema, model } = pkg;
import { MAX_AGE, MIN_AGE } from '../lib/constants'

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
});

const Contact = model('contact', contactSchema)
export default Contact