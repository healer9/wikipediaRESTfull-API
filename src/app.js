const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')

const PORT = 3000
const app = express()

// connect db
mongoose.connect('mongodb://localhost:27017/wikipediaDB', { useNewUrlParser: true, useUnifiedTopology: true })

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model('Article', articleSchema)

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

// // read all articles
// app.get('/articles', (req, res) => {
//     Article.find((err, foundArticles) => {
//         err ? res.send(err) : res.send(foundArticles)
//     })
// })
// // create new article
// app.post('/articles', (req, res) => {
//     console.log(req.body.title)
//     console.log(req.body.content)
//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     })
//     newArticle.save((err) => {
//         err ? res.send(err) : res.send(`Successfully Added new Article`)
//     })
// })
// // delete all articles
// app.delete('/articles', (req, res) => {
//     Article.deleteMany((err) => {
//         err ? res.send(err) : res.send(`All Articles have been deleted`)
//     })
// })

// chained route handlers
////////////////////////////// Request targeting all articles //////////////////////////////////
app.route('/articles')
    .get((req, res) => {
        Article.find((err, foundArticles) => {
            err ? res.send(err) : res.send(foundArticles)
        })
    }
    )
    .post((req, res) => {
        console.log(req.body.title)
        console.log(req.body.content)
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save((err) => {
            err ? res.send(err) : res.send(`Successfully Added new Article`)
        })
    }
    )
    .delete((req, res) => {
        Article.deleteMany((err) => {
            err ? res.send(err) : res.send(`All Articles have been deleted`)
        })
    }
    )

////////////////////////////// Request targeting specific article //////////////////////////////////
// if there is space between title than add %20 in place of space
app.route('/articles/:articleTitle')
    .get((req, res) => {
        Article.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
            if (foundArticle) {
                res.send(foundArticle)
            } else {
                res.send(`Article Not found with title : ${title}`)
            }
        })
    })
    .put((req, res) => {
        Article.update(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true },
            (err) => {
                err ? res.send(err) : res.send(`Article updated successfully`)
            })
    })
    .patch((req, res) => {
        Article.update({ title: req.params.articleTitle },
            { $set: req.body },
            (err) => {
                err ? res.send(err) : res.send(`Article updated successfully using patch`)
            }
        )
    })
    .delete((req, res) => {
        Article.deleteOne({ title: req.params.articleTitle }, (err) => {
            err ? res.send(err) : res.send(`Article with title : ${req.params.articleTitle} deleted successfully`)
        })
    })

app.listen(PORT, () => {
    console.log(`Port is running at ${PORT}`)
})