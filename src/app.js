const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT;

const publicDirectoryPath = path.join(__dirname,'../public')
const viewDir = path.join(__dirname,'../templates/views');
const partialsDir = path.join(__dirname,'../templates/partials');


app.set('view engine','hbs');
app.set('views',viewDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title : 'weather app',
        name : 'miketsubasa'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'about page1'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'help message1'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address || req.query.length > 1){
        return res.send('search term address is mandatory and no other term should be present')
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send(error);
        }
        else{
            forecast(latitude,longitude,(error,response)=>{
                if(error){
                    return res.send(error);
                }else{
                    res.send(response);
                }
            });
        }
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMessage : 'error in help'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorMessage : 'errorMessage'
    })
})

app.listen(port,()=>{
    console.log(`server started on port ${port}!!`);
})