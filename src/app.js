const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')

const PORT = 3000
const app = express()

// connect db
mongoose.connect('mongodb://localhost:27017/wikipediaDB', { useNewUrlParser: true })

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model('Article', articleSchema)

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send(`Greetings Server`)
})

app.listen(PORT, () => {
    console.log(`Port is running at ${PORT}`)
})