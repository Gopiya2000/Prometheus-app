const { oneMinuteInMilliseconds } = require("../../constants/app-constants");
const { awsParamsArray } = require("../../services/metrics");
const AbstractPrometheusCollector = require("./abstract-prometheus-collector");
const PrometheusDatabaseScraper = require("./prometheus-database-scraper");

class AWSPrometheusScraper extends AbstractPrometheusCollector {
    constructor(register) {
        super()
        this.register = register;
    }

    async scrape(callCount, scraper) {
        const currentTime = new Date();
        awsParamsArray.forEach(async (item) => {
            const { params } = item;
            params.StartTime = new Date(currentTime - params.Interval);
            params.EndTime = currentTime;
            let response = await scraper.gaugeMetric.cloudwatch(item);
            let gauge = scraper.gaugeMetric.createGauge(params, this.register);
            this.getValue(gauge, params, callCount, response);
        })
        await scraper.setState(new PrometheusDatabaseScraper(this.register, this.scraper))
        scraper.scrapeData(callCount)
    }

    getValue(gauge, params, callCount, response) {
        let Interval = params.Interval / oneMinuteInMilliseconds;
        if (callCount === 0 || (callCount % Interval === 0)) {
            const sortedDatapoints = response.Datapoints.sort((a, b) => b.Timestamp - a.Timestamp);
            const [latestDatapoint] = sortedDatapoints;
            this.setValue(gauge, latestDatapoint, params);
        }
    }

    setValue(gauge, latestDatapoint, params) {
        const [selectedStatistic] = params.Statistics;
        const value = latestDatapoint[selectedStatistic];
        gauge.set(value);
    }
}

module.exports = AWSPrometheusScraper