var mg = require('mongodb').MongoClient;

var dbURI = 'mongodb://localhost:27017/example';
mg.connect(dbURI, function dbConnect(error, db){
  if (error) {
    console.log('dbConnect: '+error);
    process.exit(1);
  } else {
    var samples = db.collection('sample');
    samples.insert({'x':1}, function splInsert(error, result){
      if (error) {
        console.log('splInsert: '+error);
        process.exit(1);
      } else {
        samples.find().toArray(function splToArray(error, docs){
          if (error) {
            console.log('splToArray: '+error);
            process.exit(1);
          } else {
            console.log('Docs found. Hooray !');
            docs.forEach(function docsForEach(doc){
              console.log(JSON.stringify(doc));
            })
            process.exit(0);
          }
        })
      }
    })
  }
});
