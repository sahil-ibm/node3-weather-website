const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

// pwd: __dirname
// pwd with fileName: __filename
// console.log(path.join(__dirname,'../public'))
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup static directory to serve
app.use(express.static(publicDirPath))

//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather App',
        name:'Mark Twain',
        pageTitle:'Weather'
    })
})

//express.static renders below response out of scope
//sending response for default page
app.get('',(req,res)=>{
    res.send('welcome to express!')
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is help page',
        title:'Help',
        name:'Mark Twain'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'help article not found',
        pageTitle:'Error 404',
        title:'404',
        name:'Mark Twain'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Akash Twain'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'provide address'})
    }

    geocode(req.query.address,(error,{latitude,longitude}={})=>{
        if(error){
            res.send({error})
        }else{
            forecast(latitude,longitude,(error,data)=>{
                if(error){
                    res.send({error})
                }else{
                    res.send({data})
                }
            })
        }
    })
    
})

//use at the end; runs if nothing above matches
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Error 404 Page note found',
        pageTitle:'Error 404',
        title:'404',
        name:'Mark Twain'
    })
})
//starting server
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})