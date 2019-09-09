const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
let webApp=require('./app/web-app');
let app = express(); //create the application

let movieApi=require('./app/movie-controller');


app.use(bodyParser());
app.use(bodyParser.json()); //parse body containing json data
app.use(bodyParser.urlencoded()) ; //normal web page form input
app.use(cors()); //allow all cross orgin requests

app.use('/api',movieApi);

app.use(express.static('./public/'));

webApp(app); //add web app related features to app

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