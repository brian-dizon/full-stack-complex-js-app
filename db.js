const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://bvd_reading:33JFxJ7WJPOEA3dE@cluster0.gbqj3t6.mongodb.net/?appName=Cluster0');

async function start() {
    await client.connect();
    module.exports = client.db('ComplexApp');
    const app = require('./app');
    app.listen(3000);
}

start();