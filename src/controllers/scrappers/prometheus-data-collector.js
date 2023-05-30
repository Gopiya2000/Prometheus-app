const { fiveMinutesInMilliseconds } = require("../../constants/app-constants");
const AWSPrometheusScraper = require("./aws-prometheus-scraper");
const PrometheusDatabaseScraper = require("./prometheus-database-scraper");

class PrometheusDataCollector {
    constructor(register, databaseConnection) {
        this.register = register;
        this.awsState = new AWSPrometheusScraper(this.register, this)
        this.databaseState = new PrometheusDatabaseScraper(this.register, databaseConnection.getClient(), this)
        this.currentState = this.awsState;
    }

    setState(newState) {
        this.currentState = newState;
    }
    scrapeData(callCount) {
        this.currentState.scrape(callCount);
    }
    startScrapeInterval(callCount) {
        setInterval(() => {
            callCount = callCount + 5;
            this.scrapeData(callCount)
        }, fiveMinutesInMilliseconds);
    }
}

module.exports = PrometheusDataCollector;