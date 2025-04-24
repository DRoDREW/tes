const client = require('../../../core/config').mongoClient;
const { ObjectId } = require('mongodb');

async function getCollection() {
  await client.connect();
  const db = client.db("test");
  return db.collection("products");
}

module.exports = {
  async getAll() {
    const col = await getCollection();
    return await col.find().toArray();
  },

  async getById(id) {
    const col = await getCollection();
    return await col.findOne({ _id: new ObjectId(id) });
  },

  async create(data) {
    const col = await getCollection();
    return await col.insertOne(data);
  },

  async update(id, data) {
    const col = await getCollection();
    return await col.updateOne({ _id: new ObjectId(id) }, { $set: data });
  },

  async remove(id) {
    const col = await getCollection();
    return await col.deleteOne({ _id: new ObjectId(id) });
  }
};
    