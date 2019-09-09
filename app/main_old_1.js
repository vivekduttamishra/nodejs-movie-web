//const {SERVER_PORT}=require('./config');

const express=require('express');
require('dotenv').config();
let app= express(); //create the application




let viewPath=`${__dirname}\\views`;
app.set('view engine', 'ejs'); //will auto configure ejs as the view engine
app.set('views', viewPath);



app.use(express.static('./public/'));

app.get('/',(req,res)=>{
    
    //send is express method
    //res.send(`Welcome to ${process.env.WEBSITE_TITLE}`);
    res.render('movie-list',{
        title: process.env.WEBSITE_TITLE,
        movies:[
            {
                title:'Harry Potter and the Chamber of Secrets',
                imdbRating:7.9
            },
            {
                title:'Harry Potter and the Half Blood Prince',
                imdbRating:8.4
            },
            {
                title:'Avengers: Infinity Wars',
                imdbRating:8.0
            },
        ]
    });   

})


 
const SERVER_PORT=parseInt(process.env.NODE_SERVER_PORT);

console.log('typeof(SERVER_PORT)',typeof(SERVER_PORT));

app.listen(SERVER_PORT, err=>{
    if(err){
        process.stderr.write(`Error starting server on port ${SERVER_PORT}. ${err.message}`);
        
    }else{
        process.stdout.write(`Server started on port ${SERVER_PORT}`);
    }

});