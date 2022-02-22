const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js')
const cors = require('cors')

app.use(express.json());
app.use(cors());

MongoClient.connect('mongodb://0.0.0.0:27017', {useUnifiedTopology: true})
.then((client) => {
  const db = client.db('birds')
  const birdCollection = db.collection('sightings')
  const birdRouter = createRouter(birdCollection)
  app.use('/api/sightings', birdRouter)
})
.catch(console.error)

app.listen(5000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
