const request = require('request')


let geocode = (location,callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibWlrZXRzdWJhc2E5NiIsImEiOiJjazFucmtwYXowYWwxM21yeW9uajJ2bG9hIn0.oOPcUauctP_AuU0qWq18pw`
    request({url:geocodeURL,json:true},(error,{body})=>{
        if(error)
        {
            callback({
                message : "unable to connect to geocode services!!"
            });
        }else if(body.features.length == 0)
        {
            callback({
                message : 'features array is empty.probably the location is not available!!'
            });
        }else{
            
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude:body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })    
}

module.exports = geocode