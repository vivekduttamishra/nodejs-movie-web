const { MongoClient } = require('mongodb');
require('dotenv').config();

let moviesCollection;

let db = null;
function connect( connectionString =null){

    if(!connectionString)
        connectionString=process.env.MOVIEDB_CONNECTION_STRING;
    let promise=new Promise((resolve,reject)=>{
        const client = new MongoClient(
            connectionString,
            { useNewUrlParser: true, useUnifiedTopology: true  });
        
            client.connect(err => {
            if (err) {
                reject(err);        
            } else {
                resolve(client);        
            }
        });
    });

    return promise;

}


let MovieRepository=function(connectionString){

    let _self=this;
    connect(connectionString)
        .then(client=>{
            _self.client= client;
            _self.db=client.db(process.env.MOVIEDB_NAME);
            _self.movieCollection=this.db.collection(process.env.MOVIEDB_COLLECTION);

        })
    
}

MovieRepository.prototype.getAll=async function(filter={}){
    return await this.movieCollection.find(filter).toArray();
};

MovieRepository.prototype.getById=async function(id){
    let movie=await this.movieCollection.findOne({imdbID:id});
    
    return movie;
};

MovieRepository.prototype.add=async function(movie){
    await this.movieCollection.insert(movie);
};

MovieRepository.prototype.update=async function(id,movie){
    await this.movieCollection.updateOne(
        {imdbID:id},
        {$set:{...movie}}
        );
};


MovieRepository.prototype.delete=async function(id){
    await this.movieCollection.deleteOne({imdbID:id});
}

module.exports=MovieRepository;


















