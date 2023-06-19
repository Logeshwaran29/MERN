const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";

app.get('/', (req, res) => {
  res.send("success");
});

app.listen(8000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) console.log(err);
    console.log("Connected to database");

    const db = client.db('login');
    db.collection('details').find().toArray((err, students) => {
      if (err) throw err;
      console.log(students);
    });
  });
  console.log("Server started on port 8000");
});
