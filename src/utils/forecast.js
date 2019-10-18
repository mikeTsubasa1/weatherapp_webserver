const request = require('request');


let forecast = (latitude,longitude,callback) => {
    const url = `https://api.darksky.net/forecast/db9e7539be7c9d676b90dbb13a98d5a6/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si&lang=en`
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback({
                message : 'unable to connect to forecast services!!'
            });
        }
        else if(body.error)
        {
            callback({
                message : body.error
            });
        }else{
            let responseBody = body;
            callback(undefined,{
                latitude,
                longitude,
                summary:`${responseBody.daily.data[0].summary}. It is currently ${responseBody.currently.temperature} degrees out.There is a ${responseBody.currently.precipProbability}% chance of rain`
            })
        }
    })
}
module.exports = forecast