const DbService = require("./db-service");

class QueryService {
    constructor() {
        const databaseConnection = new DbService()
        this.database = databaseConnection.getClient()
        this.db = this.database.db();
    }

    async databaseCount() {
        const collections = await this.db.listCollections().toArray();
        const collectionCount = collections.length;
        return collectionCount;
    }

    async collectionCount(collectionName) {
        const collectionCount = await this.db.collection(collectionName);
        const count = await collectionCount.countDocuments();
        return count;
    }
}

module.exports = QueryService;