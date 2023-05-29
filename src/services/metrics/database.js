let databaseParamsArray = [
    {
        Namespace: 'Custom/Database',
        MetricName: 'DBCount',
        Interval: 300000,
        Period: 30,
        Name: 'custom_database_collection_count_gauge',
        Help: 'Custom Database Collection Count Gauge',
        Value: 'hotelManagement',
    },
    {
        Namespace: 'Custom/Database',
        MetricName: 'CollectionCount',
        Interval: 300000,
        Period: 30,
        Name: 'custom_database_hotel_count_gauge',
        Help: 'Custom Database Hotel Count Gauge',
        Value: 'hotels',
    }
]

module.exports = databaseParamsArray;