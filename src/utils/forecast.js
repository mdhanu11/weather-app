const axios = require('axios')

module.exports = function forecast(query,callback) {

    const url = `http://api.weatherstack.com/current?access_key=ff52d24aba6b851e0cb9e389fbdc10b4&query=${query}`
    // console.log(url)
    axios.get(url).then((response) => {
        // console.log(response.data)
        if(response.data){
            callback(undefined,{
                temperature: response.data.current.temperature,
                precip: response.data.current.precip,
                weatherDescription: response.data.current.weather_descriptions[0]
            })
            // console.log(`${weatherDescription}. It is currently ${temp} degrees out. There is ${precip}% chance of rain` )
        }
        else{ 
            callback(response.data.error.info,undefined)
        }
    }).catch((error) => {
        callback('Not able to connect to forecast api',undefined)
        console.log(error)
    })
}
