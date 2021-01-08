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
            case 'jp':
                timeUrl = 'http://worldtimeapi.org/api/timezone/Asia/Tokyo'
                break;
            default:
                timeUrl = 'http://worldtimeapi.org/api/timezone/Asia/Jakarta'
                break;
        }

        let weatherApi = 'http://api.weatherstack.com/current?access_key=8aec2b3b55f3c908f515aa9b3c859a56&query=fetch:ip'
        let promiseNews = axios.get(newsUrl)
        let promiseTime = axios.get(timeUrl)
        let promiseWeather = axios.get(weatherApi)

        Promise.all([promiseNews, promiseTime, promiseWeather])
            .then(response => {
                let contentNews = response[0].data.articles
                let contentTime = response[1].data
                let contentWeather = response[2].data
                const apiDatas = {
                    contentNews,
                    contentTime,
                    contentWeather
                }
                res.status(200).json(apiDatas)
            })
            .catch(next)
    }
}

module.exports = ApiController