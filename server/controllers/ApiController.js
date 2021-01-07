const axios = require('axios');

class ApiController {
    static getNewsApiSport(req, res, next) {
        console.log(req.body)
        let { countryCode } = req.body
        let url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=sports&pageSize=100&apiKey=6792ee54b2db4720b9fe0fee7b7440cd`

        axios.get(url)
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(next)
    }

    static getScoreNBAData(req, res, next) {

    }
}

module.exports = ApiController