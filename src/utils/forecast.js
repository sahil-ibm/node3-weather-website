const request = require('request')

const forecast = (lat, lon, callbackFn) => {
    const url = 'http://api.weatherstack.com/current?access_key=ae69f07e6a8898a6a520cd861e33cac6&query=' + lat + ',' + lon
    
    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callbackFn('Unable to connect to weather service!', undefined)
        } else if (body.success == false) {
            callbackFn("Unable to find location", undefined)
        } else {
            callbackFn(undefined, body.current.weather_descriptions[0] + ' in ' + body.location.name + '. It is currently ' + body.current.temperature + ' degrees and feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast