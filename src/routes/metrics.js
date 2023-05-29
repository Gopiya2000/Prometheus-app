const route = (register, app) => {
    // To expose HTTP metrics endpoint so that we can get at the metrics
    app.get('/metrics', function (req, res) {
        res.setHeader('Content-Type', register.contentType)
        register.metrics().then(data => res.status(200).send(data))
    })
}

module.exports = { route }