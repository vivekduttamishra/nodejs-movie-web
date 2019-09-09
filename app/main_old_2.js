const express=require('express');
const bodyParser=require('body-parser');
require('dotenv').config();
let app= express(); //create the application
const expressLayout=require('express-ejs-layouts');


app.use(bodyParser());

let viewPath=`${__dirname}\\views`;
app.set('view engine', 'ejs'); //will auto configure ejs as the view engine
app.set('views', viewPath);

app.use(expressLayout);
app.set('layout','master-page');



let movies=[  {
    "Title": "Harry Potter and the Deathly Hallows: Part 2",
    "Year": "2011",
    "imdbID": "tt1201607",
    "Type": "movie",
    "Poster": "/images/tt1201607.jpg",
    "imdbRating": "8.1"
},
{
    "Title": "Harry Potter and the Sorcerer's Stone",
    "Year": "2001",
    "imdbID": "tt0241527",
    "Type": "movie",
    "Poster": "/images/tt0241527.jpg",
    "imdbRating": "7.5"
},
{
    "Title": "Harry Potter and the Chamber of Secrets",
    "Year": "2002",
    "imdbID": "tt0295297",
    "Type": "movie",
    "Poster": "/images/tt0295297.jpg",
    "imdbRating": "7.4"
},
{
    "Title": "Harry Potter and the Goblet of Fire",
    "Year": "2005",
    "imdbID": "tt0330373",
    "Type": "movie",
    "Poster": "/images/tt0330373.jpg",
    "imdbRating": "7.7"
},
{
    "Title": "Harry Potter and the Prisoner of Azkaban",
    "Year": "2004",
    "imdbID": "tt0304141",
    "Type": "movie",
    "Poster": "/images/tt0304141.jpg",
    "imdbRating": "7.8"
},
{
    "Title": "Harry Potter and the Order of the Phoenix",
    "Year": "2007",
    "imdbID": "tt0373889",
    "Type": "movie",
    "Poster": "/images/tt0373889.jpg",
    "imdbRating": "7.5"
},
{
    "Title": "Harry Potter and the Deathly Hallows: Part 1",
    "Year": "2010",
    "imdbID": "tt0926084",
    "Type": "movie",
    "Poster": "/images/tt0926084.jpg",
    "imdbRating": "7.7"
},
{
    "Title": "Harry Potter and the Half-Blood Prince",
    "Year": "2009",
    "imdbID": "tt0417741",
    "Type": "movie",
    "Poster": "/images/tt0417741.jpg",
    "imdbRating": "7.5"
},
{
    "Title": "Star Wars: Episode IV - A New Hope",
    "Year": "1977",
    "imdbID": "tt0076759",
    "Type": "movie",
    "Poster": "/images/tt0076759.jpg",
    "imdbRating": "8.7"
},
{
    "Title": "Star Wars: Episode V - The Empire Strikes Back",
    "Year": "1980",
    "imdbID": "tt0080684",
    "Type": "movie",
    "Poster": "/images/tt0080684.jpg",
    "imdbRating": "8.8"
}];


app.use(express.static('./public/'));

const siteTitle=process.env.WEBSITE_TITLE;

app.get('/',(req,res)=>{
    
    res.render('movie-list',{
        siteTitle,
        pageTitle:'Recommended Movies',
        movies
    });   

})

app.get('/movie/add',(req,res)=>{
    //TODO: handle get
    res.render('movie-add-form',{siteTitle, pageTitle:'Add New Movie'}); //{title} => {title:title}
});

app.post('/movie/add',(req,res)=>{
    //res.send('movie add called');
    //console.log('req.body',req.body);

    movies.push(req.body);
    res.redirect('/');
    
});


app.get('/movie/info/:id',(req,res)=>{
    //TODO: handle get
    let selected= movies.filter( movie => movie.imdbID===req.params.id);
    if(selected && selected.length){
        let movie=selected[0];
        res.render('movie-info',{siteTitle, pageTitle:movie.Title, movie});
    } else {
        res.status(404).send('Not Found '+req.params.id);
    }
});

 
const SERVER_PORT=parseInt(process.env.NODE_SERVER_PORT);

console.log('typeof(SERVER_PORT)',typeof(SERVER_PORT));

app.listen(SERVER_PORT, err=>{
    if(err){
        process.stderr.write(`Error starting server on port ${SERVER_PORT}. ${err.message}`);
        
    }else{
        process.stdout.write(`Server started on port ${SERVER_PORT}`);
    }

});