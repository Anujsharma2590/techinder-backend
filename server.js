import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors';
const connection_url = 'mongodb+srv://techinderDB:U4OLXDXwBNwtY77Y@cluster0.817wp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//U4OLXDXwBNwtY77Y
//App Config
const app = express()  //create instance of express
const port = process.env.PORT || 8001
//Middleware
app.use(express.json());
app.use(Cors())
//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
   
    useUnifiedTopology: true,
});
//API Endpoints
app.get('/', (req, res) => {
    res.status(200).send('hello world')
})
app.post('/techinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get("/techinder/cards", (req, res) => {
    Cards.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
});


//listener

app.listen(port, () => console.log(`listening to ${port} `))
