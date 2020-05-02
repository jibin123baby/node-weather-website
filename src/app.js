const express = require('express');
const path = require('path');
var hbs = require('hbs');
const geoCoding = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;
const app = express();

// Define Paths for Express Config
const pubicDirectoryPath =path.join(__dirname,'../public/');
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//Setting Static directory to serve
app.use(express.static(pubicDirectoryPath,{
    extensions: ["html"],
    })
  );
//ssetting handlebars engine and views location 
app.set('view engine', 'hbs');  // To render hbs files
app.set('views',viewsPath); //We are changing the default path from views to templates
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name:"Jibin Baby"
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About",
        name:"Jibin Baby"
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        help: "We are very happy to help you. Thanks",
        title: "Help",
        name:"Jibin Baby"
    });
});

app.get('/weather',(req,res)=>{
    const address= req.query.address;
    if(!address){
        return res.send({
            error : "Error ! Please Provide an Address"
        });
    }    
    geoCoding(address,(error,{latitude,longitude,placeName} ={}) =>{
        if(error){
            return res.send({
                address: address,
                error : error                
            });
        }
        else{
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({
                        address: address,
                        error : error
                    });
                }else{
                    res.send({
                        address: address,
                        location: placeName,
                        forecast: forecastData.weather_descriptions + ". Temperature is " + forecastData.temperature +". But it feels like "+forecastData.feelslike
                    });
                }

            });
        }
    });    
});

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : "Error ! Please Provide a product name"
        });
    }
    res.send({
        products:req.query.search
    });

});

app.get('/help/*',(req,res)=>{
    res.render('errorPage',{
        title:"404",
        name: "Jibin Baby",
        errorMsg: "Page Not Found"
    })
});
//This should be in last
app.get('*',(req,res)=>{
    res.render('errorPage',{
        title:"404",
        name: "Jibin Baby",
        errorMsg: "Page Not Found"
    })
});


app.listen(port,()=>{
    console.log("App is started on port "+ port);
})