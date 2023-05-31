const { CloudWatchClient, GetMetricStatisticsCommand } = require("@aws-sdk/client-cloudwatch");
const config = require("../../../config");
const { oneMinuteInMilliseconds } = require("../../constants/app-constants");
const { awsParamsArray } = require("../../services/metrics");
const AbstractPrometheusCollector = require("./abstract-prometheus-collector");

class AWSPrometheusScraper extends AbstractPrometheusCollector {
    constructor(register, scrapper) {
        super()
        this.register = register;
        this.scrapper = scrapper;
    }

    async scrape(callCount) {
        const client = new CloudWatchClient({ region: config.get('region') });
        const currentTime = new Date();
        awsParamsArray.forEach(async (item) => {
            const { params } = item;
            params.StartTime = new Date(currentTime - params.Interval);
            params.EndTime = currentTime;
            const command = new GetMetricStatisticsCommand(item.params);
            const response = await client.send(command);
            let gauge = this.createGauge(params, this.register);
            this.getValue(gauge, params, callCount, response);
        })
        await this.scrapper.setState(this.scrapper.databaseState)
        this.scrapper.scrapeData(callCount)
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