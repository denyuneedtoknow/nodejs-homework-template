
import db from "./db"
import { ObjectId } from "mongodb"


const getCollection = async (db, name) => {
    const client = await db
    const collection = await client.db().collection(name)
    return collection
}

const listContacts = async () => {
    const collection = await getCollection(db, 'contacts')
    const result = await collection.find().toArray()
    return result
}

const getContactById = async (contactId) => {
    const id = ObjectId(contactId)
    const collection = await getCollection(db, 'contacts')
    const { value: result } = await collection.find({ _id: id })
    return result
}

const removeContact = async (contactId) => {
    const id = ObjectId(contactId)
    const collection = await getCollection(db, 'contacts')
    const result = await collection.findOneAndDelete({ _id: id })
    return result
}


const addContact = async (body) => {
    const collection = await getCollection(db, 'contacts')
    const newContact = {
        favourite: false,
        ...body,
    }
    const result = await collection.insertOne(newContact)
    return result
}

const updateContact = async (contactId, body) => {
    const id = ObjectId(contactId)
    const collection = await getCollection(db, 'contacts')
    const result = await collection.findOneAndUpdate({ _id: id }, { $set: body })
    return result
}


export default { listContacts, getContactById, removeContact, addContact, updateContact }

