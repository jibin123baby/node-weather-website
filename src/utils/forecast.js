const request = require('request');

const forecast = (latitude,longitude,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=10bb80748b5a8d311d4e181b17a0506c&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude);
   // const url = "http://api.weatherstack.com/current?access_key=10bb80748b5a8d311d4e181b17a0506c&query=&units=f";
    //request({url,json: true},(error,response)=>{  //before destructuring refer playgroung
    request({url,json: true},(error,{body})=>{
        if(error){
            callback("Unable to Connect to Weather Services",undefined)
        }else if(body.error){
            callback("Unable to find the weather for this location",undefined);
        }else{
            try {
                callback(undefined,{
                    weather_descriptions: body.current.weather_descriptions[0],
                    temperature: body.current.temperature,
                    feelslike: body.current.feelslike,
                    humidity: body.current.humidity
                });
            } catch (error) {
                callback("Error in Reading the Properties",undefined);
            }
            
        }
    });
}

module.exports=forecast;