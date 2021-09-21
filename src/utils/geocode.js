const axios = require('axios')

module.exports = function getGeocode(address,callback) {
    const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWRoYW51MTEiLCJhIjoiY2p6ZjNmM241MDhjazNqcWthaW1pdDh4NSJ9.i8LRuEQ1D6AZTOv6L6WcAw`
    axios.get(mapUrl).
        then((response) => {
            if(response.data.features.length == 0){
                // console.log('No results found')
                callback('No results found',undefined)
            }
            else{
                callback(undefined,{
                    latitude: response.data.features[0].center[0],
                    longitude: response.data.features[0].center[1],
                    location: response.data.features[0].place_name
                })
            }
        }).catch((error) => {
            // console.log('Not able to connect Geocoding APi')
            callback('Not able to connect Geocoding APi')
        })
}
