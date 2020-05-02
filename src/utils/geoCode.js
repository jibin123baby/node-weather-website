const request = require('request');

const geoCoding = (address,callback) =>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?limit=1&access_token=pk.eyJ1IjoiamliaW4xMjMiLCJhIjoiY2s5aXIyN3U1MDE3bjNmc2F0cnUzbW4zdyJ9.5Ts_zQqOHNo5e9JvmqM68w";
    request({url,json: true},(error,{body}) =>{
        if(error){
            callback("Unable to Connect to Search Services",undefined);
        }
        else if((body.message == "Not Found") || (body.features.length == 0)) {
            callback("Unable to find location, Try another Location",undefined);
        }
        else{
            callback(undefined,{
                placeName : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            });
        }
    })
};

module.exports=geoCoding;