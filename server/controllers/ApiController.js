const axios = require('axios');

class ApiController {
    static async getNewsApiSport(req, res, next) {
        try {
            let { countryCode } = req.body
        let timeUrl = ''
        let newsUrl = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=sports&pageSize=100&apiKey=6792ee54b2db4720b9fe0fee7b7440cd`
        
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
        let contentNews = await axios.get(newsUrl)
        let contentTime = await axios.get(timeUrl)
        let contentWeather = await axios.get(weatherApi)
        const apiDatas = {
            contentTime: contentTime.data,
            contentWeather: contentWeather.data,
            contentNews: contentNews.data.articles
        }
        return res.status(200).json(apiDatas)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ApiController