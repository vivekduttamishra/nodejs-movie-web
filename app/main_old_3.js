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


//---------- mongodb configuration -----------


const { MongoClient } = require('mongodb');
let db = null;
const client = new MongoClient(
    process.env.MOVIEDB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true  });

client.connect(err => {
    if (err) {
        console.log('connection to database failed');

    } else {
        db = client.db(process.env.MOVIEDB_NAME);
        console.log('connected to mongo db successfully');

    }

});


//--------------------------------------------



app.use(express.static('./public/'));


const siteTitle = process.env.WEBSITE_TITLE;

app.get('/', (req, res) => {

    db.collection(process.env.MOVIEDB_COLLECTION)
        .find({}).toArray((err, movies) => {

            if (!err) {
                res.render('movie-list', {
                    siteTitle,
                    pageTitle: 'Recommended Movies',
                    movies
                });
            } else{
                console.log(`error:${error.message}`);
                res.status(500).send(err.message);
            }
        });

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


app.get('/movie/info/:id', async (req, res) => {
    //TODO: handle get

    let movie=await db.collection(process.env.MOVIEDB_COLLECTION)
                    .findOne({imdbID:req.params.id});
    console.log('movie',movie);
    res.render('movie-info',{siteTitle, pageTitle:movie.Title,movie});
});

app.get('/movie/addjson',(req,res)=>{
    //TODO: handle get
    res.render('json-form',{siteTitle,pageTitle:'Enter Movie Detaisl as Json'});
});

app.post('/movie/addjson',async (req,res)=>{
    //TODO: handle get
    let movie= JSON.parse(req.body.movieinfo);
    //console.log('got',movie);
    //res.send('movie received');

    await db.collection(process.env.MOVIEDB_COLLECTION)
            .insert(movie);

    res.redirect('/');

});




const SERVER_PORT = parseInt(process.env.NODE_SERVER_PORT);

console.log('typeof(SERVER_PORT)', typeof (SERVER_PORT));

app.listen(SERVER_PORT, err => {
    if (err) {
        process.stderr.write(`Error starting server on port ${SERVER_PORT}. ${err.message}`);

    } else {
        process.stdout.write(`Server started on port ${SERVER_PORT}`);
    }

});