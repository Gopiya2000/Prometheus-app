class QueryService {
    constructor(db) {
        this.db = db.db();
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