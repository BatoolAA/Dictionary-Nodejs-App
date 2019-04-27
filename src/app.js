const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const request = require('request')

// console.log(__dirname)
// console.log(__filename)

const newPathToPublicFolder = path.join(__dirname,'../public/')
//console.log(newPathToPublicFolder)
app.use(express.static(newPathToPublicFolder))

const viewsFolder= path.join(__dirname, '../templates/views/')
app.set("views", viewsFolder)

const partialFolder = path.join(__dirname, '../templates/partials/')
hbs.registerPartials(partialFolder)

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render("index", {
        title: "bootcamp",
        course: "nodejs",
    })
})

app.get('/about', (req, res) => {
    console.log(req.query)
    
    if(!req.query.createdBy)
        return res.send("Created by is not found!!")
    res.render("about", {
        createdBy: req.query.createdBy,
    })
})

app.get('/search', (req, res) => {
    const { word } = req.query
    if(!word)
    return res.send({error: "word not found"})

    const options = {
        url: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/' + word,
        headers: {
            "Accept": "application/json",
            "app_id": "",
            "app_key": "",
        },
        json: true,
    }

    const callback = (error, response) => {
        const definition = response && response.statusCode === 200
        ? response.body.results[0].lexicalEntries[0].entries[0].senses[0].definitions
        : "Sorry!! "

        const data = {
            word,
            definition,
        }

        // return res.render("search",{
        //     data,
        // })

        return res.send({
            data,
        })
    }

    request(options, callback)
})

app.get('/object', (req, res) => {
    res.send({
        name: "ali",
    })
})

app.get('*', (req, res) => {
    res.send("no page found")
})

app.listen( 3000, () => {
    console.log("server is up..")
})