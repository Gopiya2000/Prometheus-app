const { fiveMinutesInMilliseconds } = require("../../constants/app-constants");
const dbService = require("../../services/common/db-service");
const AWSPrometheusScraper = require("./aws-prometheus-scraper");
const PrometheusDatabaseScraper = require("./prometheus-database-scraper");

class PrometheusDataCollector {
    constructor(callCount, register) {
        this.callCount = callCount;
        this.register = register;
    }
    scrapeData() {
        const databaseConnection = new dbService();
        databaseConnection.start();
        const scrapeAws = new AWSPrometheusScraper(this.register);
        const scrapeDatabase = new PrometheusDatabaseScraper(this.register, databaseConnection.getClient());
        scrapeDatabase.scrape(this.callCount);
        scrapeAws.scrape(this.callCount);
        setInterval(() => {
            this.callCount = this.callCount + 5
            scrapeAws.scrape(this.callCount);
            scrapeDatabase.scrape(this.callCount);
        }, fiveMinutesInMilliseconds);
    }
}

module.exports = PrometheusDataCollector;