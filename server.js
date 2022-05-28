const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const database = require('./config/config.js')

MongoClient.connect(database.connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to the savage-demo database!')
    const msgCollection = client.db('savage-demo').collection('messages')

    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    app.get('/', (req, res) => {
      msgCollection.find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('index.ejs', { messages: result })
      })
    })

    app.post('/messages', (req, res) => {
      msgCollection.insertOne({ name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown: 0 }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
      })
    })

    app.put('/messages', (req, res) => {
      msgCollection.findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, {
          $set: {
            thumbUp: req.body.thumbUp + 1
          }
        }, {
          sort: { _id: -1 },
          upsert: true
        }, (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        })
    })

    app.put('/messagesDown', (req, res) => {
      msgCollection.findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, {
          $set: {
            thumbUp: req.body.thumbUp - 1
          }
        }, {
          sort: { _id: -1 },
          upsert: true
        }, (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        })
    })

    app.delete('/messages', (req, res) => {
      msgCollection.findOneAndDelete({ name: req.body.name, msg: req.body.msg }, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

    app.listen(3000, () => {
      console.log('listening on port 3000')
    });

  })
