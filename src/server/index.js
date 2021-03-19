const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch')
const PORT = 8081

const BASE_API_URL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(`Your API Key is ${process.env.API_KEY}`);
let userUrl = []

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})
// INFO: a route that handling post request for new URL that coming from the frontend
app.post('/api', async (req, res) => {
    try {
        userUrl = req.body.url;
    console.log(`You entered: ${userUrl}`);
    const apiURL = `${BASE_API_URL}key=${apiKey}&url=${userUrl}&lang=en`
    const response = await fetch(apiURL)
    const apiData = await response.json()
    console.log(apiData)
    res.send(apiData)
    } catch (error) {
        console.log(error.message)
    }
})


// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

export default app
