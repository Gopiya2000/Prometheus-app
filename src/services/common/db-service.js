const { MongoClient } = require('mongodb');
const config = require("../../../config");

class DbService {
    constructor() {
        this.client = null;
    }

    async start() {
        this.client = new MongoClient(config.get('databaseURL'));
        await this.client.connect();
        console.log("Connected to Database");
    }

    getClient() {
        return this.client;
    }
}

module.exports = DbService;