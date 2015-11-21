'use strict';
const mg = require('mongodb').MongoClient;

const dbURI = 'mongodb://localhost:27017/example';
mg.connect(dbURI, function dbConnect(error, db){
  if (error) {
    console.log('dbConnect: '+error);
    process.exit(1);
  } else {
    const doc = {
        'title'   : 'Jaws'
      , 'year'    : 1975
      , 'directot': 'Steven Speilberg'
      , 'rating'  : 'PG'
      , 'ratings' : {
          'critics' : 80
        , 'public'  : 97
      }
      , 'screenplay' : ['Peter Benchley', 'Carl Gotlieb']
    };

    let movies = db.collection('movies');
    movies.insert(doc, function docInserted(error, result){
      if (error) {
        console.log('docInserted: '+error);
        process.exit(1);
      } else {
        const query = {
          'ratings.public' : {'$gte': 90}
        };
        movies.find(query).toArray(function mvToArray(error, docs){
          if (error) {
            console.log('mvToArray: '+error);
            process.exit(1);
          } else {
            console.log('Docs found. Hooray!');
            docs.forEach(function logDoc(doc){
              console.log(JSON.stringify(doc));
              return doc;
            });
            process.exit(0);
          }
        })
      }
    })
  }
});
