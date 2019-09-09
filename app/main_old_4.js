const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
let app = express(); //create the application
const expressLayout = require('express-ejs-layouts');


app.use(bodyParser());

//------- view engine configuration-------------
let viewPath = `${__dirname}\\views`;
app.set('view engine', 'ejs'); //will auto configure ejs as the view engine
app.set('views', viewPath);

app.use(expressLayout);
app.set('layout', 'master-page');
//--------view engine configuration


const MovieRepository=require('./movie-repository');

let movieRepository=new MovieRepository();

app.use(express.static('./public/'));


const siteTitle = process.env.WEBSITE_TITLE;

app.get('/', async (req, res) => {

    try{
        let movies=await movieRepository.getAll();
        res.render('movie-list',{siteTitle,pageTitle:'Movie List', movies});
    }catch(ex){
        res.status(500).send(ex);
    }

});

app.get('/movie/add', (req, res) => {
    //TODO: handle get
    res.render('movie-add-form', { siteTitle, pageTitle: 'Add New Movie' }); //{title} => {title:title}
});

app.post('/movie/add', (req, res) => {
    //res.send('movie add called');
    //console.log('req.body',req.body);

    movies.push(req.body);
    res.redirect('/');

});


app.get('/movie/info/:id', async (req, res,next) => {
    //TODO: handle get
    
    let movie=await movieRepository.getById(req.params.id);
    
    if(movie===null){
        req.notFound='Invalid ImdbId';
        next(); //let someone else process it
    } else
        res.render('movie-info',{siteTitle, pageTitle:movie.Title,movie});
});

app.get('/movie/addjson',(req,res)=>{
    //TODO: handle get
    res.render('json-form',{siteTitle,pageTitle:'Enter Movie Detaisl as Json'});
});

app.post('/movie/addjson',async (req,res)=>{
    //TODO: handle get
    let movie= JSON.parse(req.body.movieinfo);
    await movieRepository.add(movie);
    res.redirect('/');

});

//will send a 404 for any url not defined here
app.use((req,res,next)=>{
    req.notFound=`Invalid Url ${req.url}`;
    next();
});

app.use((req,res,next)=>{
    //404 handler!
    if(req.notFound){

        let tot=parseInt(process.env.TOTAL_404_IMAGES);
        let current= Math.floor(Math.random()*tot);

        res
        .status(404)
        .render('not-found',{siteTitle,pageTitle:req.notFound,imageId:current});
    } else{
        next();
    }
})


const SERVER_PORT = parseInt(process.env.NODE_SERVER_PORT);

console.log('typeof(SERVER_PORT)', typeof (SERVER_PORT));

app.listen(SERVER_PORT, err => {
    if (err) {
        process.stderr.write(`Error starting server on port ${SERVER_PORT}. ${err.message}`);

    } else {
        process.stdout.write(`Server started on port ${SERVER_PORT}`);
    }

});