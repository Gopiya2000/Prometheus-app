const { MongoClient } = require('mongodb');
const config = require("../../../config");

class DbService {
    constructor() {
        this.client = null;
        this.start();
    }

    async start() {
        this.client = new MongoClient(config.get('databaseURL'));
        await this.client.connect();
    }

    getClient() {
        return this.client;
    }
}

module.exports = DbService;