const axios = require('axios');

class ApiController {
    static getNewsApiSport(req, res, next) {
        console.log(req.body)
        let { countryCode } = req.body
        let timeUrl = ''
        let newsUrl = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=sports&pageSize=100&apiKey=6792ee54b2db4720b9fe0fee7b7440cd`
        let obj = {}


        switch (countryCode) {
            case 'id':
                timeUrl = 'http://worldtimeapi.org/api/timezone/Asia/Jakarta'
                break;
            case 'us':
                timeUrl = 'http://worldtimeapi.org/api/timezone/America/New_York'
                break;
            case 'de':
                timeUrl = 'http://worldtimeapi.org/api/timezone/Europe/Berlin'
                break;
            case 'it':
                timeUrl = 'http://worldtimeapi.org/api/timezone/Europe/Rome'
                break;
            case '':
                timeUrl = 'http://worldtimeapi.org/api/timezone/Asia/Tokyo'
                break;
            default:
                timeUrl = 'http://worldtimeapi.org/api/timezone/Asia/Jakarta'
                break;
        }

        axios.get(newsUrl)
        .then(response => {
            // res.status(200).json(response.data)
            obj.articles = response.data.articles
            return axios.get(timeUrl)
        })
        .then(time => {
            obj.time = time.data
            res.status(200).json(obj)
        })
        .catch(next)
    }
}

module.exports = ApiController