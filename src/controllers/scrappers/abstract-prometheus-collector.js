const GaugeMetricManager = require("../../services/common/gauge-metric-manager");

class AbstractPrometheusCollector extends GaugeMetricManager {

    scrape(){
        throw new Error('You have to implement the method scrape!');
    }
    getValue(){
        throw new Error('You have to implement the method getValue!');
    }
    setValue(){
        throw new Error('You have to implement the method setValue!');
    }
}

module.exports = AbstractPrometheusCollector;