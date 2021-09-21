const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Paths for Express
const publicDir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//Setup for handlebars and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDir))

app.get('/',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Dhanu'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Dhanu'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Dhanu',
        'helpText': 'This is help text'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address,(error,data) => {
        // console.log(error)
        // console.log(data)
        if(error){
            return res.send({
                error
            })
        }
        else{
            const query = `${data.latitude},${data.longitude}`
            forecast(query,(forecastError,result) =>{
                if(forecastError){
                    return res.send({
                        error: forecastError
                    })
                }
                
                return res.send({
                    forecast: result.weatherDescription,
                    location: data.location,
                    address:req.query.address
                })
            })
        }
    })
})



app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Dhanu',
        errorMessage: 'Page Not Found'
    })
})

app.listen(5000,() => {
    console.log('Server is listening on 5000....')
})