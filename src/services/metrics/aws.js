const awsParamsArray = [
    {
        service: 'EC2', action: 'CPU', params: {
            Namespace: 'AWS/EC2',
            MetricName: 'CPUUtilization',
            Interval: 600000,
            Period: 30,
            Statistics: ['Maximum'],
            Name: 'aws_EC2_CPU_gauge',
            Help: 'AWS EC2 CPU gauge',
            Dimensions: [
                {
                    Name: 'InstanceId',
                    Value: 'i-0baa917c4b22ca538'
                }
            ]
        }
    },
    {
        service: 'EC2', action: 'CPUAverage', params: {
            Namespace: 'AWS/EC2',
            MetricName: 'CPUUtilization',
            Interval: 300000,
            Period: 30,
            Statistics: ['Maximum'],
            Name: 'aws_EC2_CPUAverage_gauge',
            Help: 'AWS EC2 CPUAverage gauge',
            Dimensions: [
                {
                    Name: 'InstanceId',
                    Value: 'i-0baa917c4b22ca538'
                }
            ]
        }
    },
    {
        service: 'EC2', action: 'NetworkOut', params: {
            Namespace: 'AWS/EC2',
            MetricName: 'NetworkOut',
            Interval: 600000,
            Period: 30,
            Statistics: ['Average'],
            Name: 'aws_EC2_NetworkOut_gauge',
            Help: 'AWS EC2 NetworkOut gauge',
            Dimensions: [
                {
                    Name: 'InstanceId',
                    Value: 'i-0baa917c4b22ca538'
                }
            ]
        }
    },
    {
        service: 'EC2', action: 'NetworkIn', params: {
            Namespace: 'AWS/EC2',
            MetricName: 'NetworkIn',
            Interval: 300000,
            Period: 30,
            Statistics: ['Average'],
            Name: 'aws_EC2_NetworkIn_gauge',
            Help: 'AWS EC2 NetworkIn gauge',
            Dimensions: [
                {
                    Name: 'InstanceId',
                    Value: 'i-0baa917c4b22ca538'
                }
            ]
        }
    },
    {
        service: 'EC2', action: 'CPUCreditUsage', params: {
            Namespace: 'AWS/EC2',
            MetricName: 'CPUCreditUsage',
            Interval: 900000,
            Period: 30,
            Statistics: ['Average'],
            Name: 'aws_EC2_CPUCreditUsage_gauge',
            Help: 'AWS EC2 CPUCreditUsage gauge',
            Dimensions: [
                {
                    Name: 'InstanceId',
                    Value: 'i-0baa917c4b22ca538'
                }
            ]
        }
    },
    {
        service: 'EC2',
        action: 'CPUUtilization',
        params: {
            Namespace: 'AWS/EC2',
            MetricName: 'CPUUtilization',
            Interval: 300000,
            Period: 30,
            Statistics: ['Average'],
            Name: 'aws_EC2_CPUUtilization_gauge',
            Help: 'AWS EC2 CPUUtilization gauge',
            Dimensions: [
                {
                    Name: 'InstanceId',
                    Value: 'i-0baa917c4b22ca538'
                }
            ],
            Unit: 'Percent',
            Debug: true,
            EndpointUrl: 'http://localhost:9090',
            NoVerifySSL: true,
            NoPaginate: false,
            Output: 'json',
            Region: 'eu-north-1',
            Version: "^3.329.0",
            Color: 'auto',
            NoSignRequest: false,
            CliReadTimeout: 120,
            CliConnectTimeout: 30
        }
    },
]

module.exports = awsParamsArray;