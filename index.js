const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config({ path: '.env.local' }) || require('dotenv').config()
const connectToMongo = require('./db')
const MoneyTrack = require('./models/money.model')

connectToMongo()

const port = process.env.PORT


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    try {
        const data = await MoneyTrack.find();
        // console.log('Data fetched:', data); // Debugging statement
        res.sendFile(path.join(__dirname, 'public/index.html'));
        // res.write(`<script>window.moneyTracks = ${JSON.stringify(data)}</script>`);
        res.end();
    } catch (error) {
        console.log('Error fetching data:', error); // Error handling
        res.status(500).send('Internal Server Error');
    }
});

app.post('/', async (req, res) => {
    const data = await req.body
    console.log(data)
    try {
        let newMoneyTrack = new MoneyTrack(data)
        let createdMoneyTrack = await newMoneyTrack.save()
        console.log(createdMoneyTrack)
        res.status(201).sendFile(path.join(__dirname, 'public/index.html'))
    } catch (error) {
        console.log('Some error occurred', error)
    }
})

app.get('/fetchData',async (req, res)=>{
try {
    const data = await MoneyTrack.find();
    res.status(200).send({data})
} catch (error) {
    
}
})

app.delete('/delete', async (req, res) => {
    const { _id } = await req.body
    try {
        let moneyTrack = await MoneyTrack.findByIdAndDelete(_id)
        if (moneyTrack) {
            res.status(200).sendFile(path.join(__dirname, 'public/index.html'))
        } else {
            res.status(500)
        }
    } catch (error) {
        console.log("Some error occurred", error)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT || port}`)
})